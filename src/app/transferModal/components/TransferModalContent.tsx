import { useQueryClient } from "@tanstack/react-query";
import Button from "components/Button";
import { useActionState, useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { toast } from "react-toastify";
import { Transfer } from "../action/action";
import SelectRecipient, { UserOptions } from "./SelectRecipient";
import { FormTransferValues, transferFormSchema } from "../action/schema";
import { useDispatch } from "react-redux";
import { closeModal } from "store/modalStore";

export default function TransferModalContent() {
  const [state, dispatchTransfer] = useActionState(Transfer, {
    success: false,
    message: "",
  });
  const [values, setValues] = useState<FormTransferValues>({
    amount: null,
    to: null,
  });
  const [isDirty, setIsDirty] = useState<
    Record<keyof FormTransferValues, boolean>
  >({
    amount: false,
    to: false,
  });
  const [displayCurrency, setDisplayCurrency] = useState<string>("");
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormTransferValues, string | number>>
  >({});

  const dispatch = useDispatch();
  const query = useQueryClient();

  function handleChange(
    field: keyof FormTransferValues,
    value: string | number | UserOptions
  ) {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    setIsDirty((prev) => ({
      ...prev,
      [field]: true,
    }));

    //Validate
    const check = transferFormSchema.safeParse({ ...values, [field]: value });

    if (!check.success) {
      const issue = check.error.issues.find((issue) => issue.path[0] === field);
      setErrors((prev) => ({
        ...prev,
        [field]: issue?.message,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  }

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        query.invalidateQueries({ queryKey: ["balance"] });
        query.invalidateQueries({ queryKey: ["expenses"] });
        query.invalidateQueries({ queryKey: ["transactions"] });
        toast.success(state.message);
        dispatch(closeModal());
      } else {
        toast.error(state.message);
      }
    }
  }, [state, query, dispatch]);

  return (
    <div className="flex flex-col gap-6 w-full">
      <h5 className="text-3xl font-bold">Transfer</h5>
      <form action={dispatchTransfer} className="flex flex-col gap-3 w-full">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="recipient" className="font-semibold text-sm">
            Select Recipient
          </label>
          <SelectRecipient
            name="to"
            value={values.to}
            onChange={(newValue: UserOptions) => handleChange("to", newValue)}
          />
          {errors.to && <p className="text-red-500">{errors.to}</p>}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="amount" className="font-semibold text-sm">
            Amount
          </label>
          <CurrencyInput
            className="px-4 py-2 w-full  border-1 border-gray-300 rounded-md max-w-lg no-arrows"
            name="amount"
            placeholder="ex: 10.000"
            allowNegativeValue={false}
            value={displayCurrency}
            allowDecimals={false}
            decimalSeparator=","
            groupSeparator="."
            onValueChange={(value, e, values) => {
              setDisplayCurrency(values.value);
              handleChange("amount", values.float);
            }}
          />
          {errors.amount && <p className="text-red-500">{errors.amount}</p>}
        </div>

        <Button
          className="py-2"
          disabled={
            Object.values(isDirty).every((e) => !e) ||
            !transferFormSchema.safeParse(values).success
          }
        >
          Transfer
        </Button>
      </form>
    </div>
  );
}
