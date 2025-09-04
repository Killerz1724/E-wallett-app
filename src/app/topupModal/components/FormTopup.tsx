import Button from "components/Button";
import SelectLocal, { SelectLocalProps } from "components/ui/SelectLocal";
import { useSourceOfFundsGet } from "../hooks/mutation";
import SkeletonLoading from "components/SkeletonLoading";
import { COMMON_ERROR } from "constant/common";
import { useActionState, useEffect, useState } from "react";
import { TopUp } from "../action/action";
import { toast } from "react-toastify";
import { schemaTopupForm, TopUpForm } from "../action/schema";
import CurrencyInput from "react-currency-input-field";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { closeModal } from "store/modalStore";

export default function FormTopup() {
  const [values, setValues] = useState<TopUpForm>({
    amount: null,
    source_of_fund: null,
  });
  const [displayCurrency, setDisplayCurrency] = useState<string>("");

  const [errors, setErrors] = useState<
    Partial<Record<keyof TopUpForm, string>>
  >({});
  const [isDirty, setIsDirty] = useState<
    Partial<Record<keyof TopUpForm, boolean>>
  >({
    amount: false,
    source_of_fund: false,
  });

  const [state, dispatchTopup] = useActionState(TopUp, {
    success: false,
    message: "",
  });
  const { data, isPending, isError } = useSourceOfFundsGet();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  function handleChange(
    field: keyof TopUpForm,
    value: SelectLocalProps["options"] | string | number
  ) {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    setIsDirty((prev) => ({
      ...prev,
      [field]: true,
    }));

    const check = schemaTopupForm.safeParse({ ...values, [field]: value });

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
        dispatch(closeModal());
        queryClient.invalidateQueries({ queryKey: ["balance"] });
        queryClient.invalidateQueries({ queryKey: ["income"] });
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state, dispatch, queryClient]);
  return (
    <form action={dispatchTopup} className="flex flex-col gap-3 w-full">
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="source-fund" className="font-semibold text-sm ">
          Select Method
        </label>
        {isPending ? (
          <SkeletonLoading />
        ) : isError ? (
          <p>{COMMON_ERROR}</p>
        ) : (
          <>
            <SelectLocal
              name="source_of_fund"
              value={values.source_of_fund ? String(values.source_of_fund) : ""}
              options={data.map((val) => {
                return { label: val.name, value: String(val.id) };
              })}
              placeholder="Select Method"
              onValueChange={(value) =>
                handleChange("source_of_fund", Number(value))
              }
            />
            {errors.source_of_fund && (
              <p className="text-red-500">{errors.source_of_fund}</p>
            )}
          </>
        )}
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="source-fund" className="font-semibold text-sm">
          Amount
        </label>
        <CurrencyInput
          name="amount"
          placeholder="ex: 10.000"
          allowDecimals={false}
          groupSeparator="."
          decimalSeparator=","
          step={0.01}
          value={displayCurrency}
          onValueChange={(_, __, values) => {
            setDisplayCurrency(values.value);
            handleChange("amount", values.float);
          }}
          className="w-full border-1 border-gray-300 rounded-md p-2"
        />
        {errors.amount && <p className="text-red-500">{errors.amount}</p>}
      </div>

      <Button
        className="py-2"
        disabled={
          Object.values(isDirty).every((e) => !e) ||
          !schemaTopupForm.safeParse(values).success
        }
      >
        Top Up
      </Button>
    </form>
  );
}
