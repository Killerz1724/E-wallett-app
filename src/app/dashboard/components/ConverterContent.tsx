import SkeletonLoading from "components/SkeletonLoading";
import { COMMON_ERROR } from "constant/common";
import { useDebounce } from "hooks/useDebounce";
import { ArrowLeftRight } from "lucide-react";
import { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import {
  setUserExchangeAmount,
  setUserExchangeFrom,
  setUserExchangeTo,
} from "store/userStore";
import { useConvertGet } from "../hooks/exchangeRatesMutation";
import FromCountry from "./FromCountry";
import ToCountry from "./ToCountry";

export default function ConverterContent() {
  const { mutateAsync: convert, data, isPending, isError } = useConvertGet();

  const { from, amount, to } = useSelector(
    (state: RootState) => state.user.userExchangeRate
  );
  const [amountVal, setAmountVal] = useState<string>(
    String(amount ? amount : 0)
  );
  const dispatch = useDispatch();
  const debounceValue = useDebounce(amountVal, 500);
  function handleChange(value: string | undefined) {
    const val = value;

    setAmountVal(val);
  }

  function handleSwitch() {
    dispatch(setUserExchangeFrom(to));
    dispatch(setUserExchangeTo(from));
  }

  useEffect(() => {
    dispatch(setUserExchangeAmount(Number(debounceValue)));
    convert();
  }, [from, to, amount, convert, debounceValue, dispatch]);

  return (
    <>
      <div className="flex flex-col gap-8 ">
        <div className="space-y-4 w-full">
          <div className="flex gap-3 items-center">
            <div className="w-1/2">
              <h3 className="font-semibold text-lg">Input Currency Amount</h3>
              <CurrencyInput
                className="px-4 py-2 w-full  border-1 border-gray-300 rounded-md max-w-lg no-arrows"
                placeholder="0.00"
                value={amountVal || ""}
                onValueChange={handleChange}
                allowNegativeValue={false}
                allowDecimals={false}
                decimalSeparator=","
                groupSeparator="."
              />
            </div>
            <div className="flex items-center gap-4">
              <FromCountry />
              <ArrowLeftRight
                className="cursor-pointer"
                onClick={handleSwitch}
              />
              <ToCountry />
            </div>
          </div>
        </div>
        {isError ? (
          <h4>{COMMON_ERROR}</h4>
        ) : (
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-sm text-gray-400">
              1 {from} ={" "}
            </span>

            {isPending ? (
              <SkeletonLoading />
            ) : (
              data && (
                <>
                  <p className="text-4xl font-bold">
                    {data.Result.toLocaleString("id-ID")} {to}{" "}
                  </p>
                </>
              )
            )}

            <span className="font-semibold text-sm text-gray-400">
              {isPending ? (
                <SkeletonLoading />
              ) : (
                data && (
                  <>
                    1 {from} = {data.To.Rates.toLocaleString("id-ID")} {to}{" "}
                  </>
                )
              )}
            </span>
          </div>
        )}
      </div>
    </>
  );
}
