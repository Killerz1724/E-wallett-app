import SkeletonLoading from "components/SkeletonLoading";
import { COMMON_ERROR } from "constant/common";
import { ArrowLeftRight } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
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
import { useDebounce } from "hooks/useDebounce";

export default function ConverterContent() {
  const { mutateAsync: convert, data, isPending, isError } = useConvertGet();

  const { from, amount, to } = useSelector(
    (state: RootState) => state.user.userExchangeRate
  );
  const [amountVal, setAmountVal] = useState<number>(amount);
  const dispatch = useDispatch();
  const debounceValue = useDebounce(amountVal, 500);
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setAmountVal(Number(e.target.value));
  }

  function handleSwitch() {
    dispatch(setUserExchangeFrom(to));
    dispatch(setUserExchangeTo(from));
  }

  useEffect(() => {
    dispatch(setUserExchangeAmount(debounceValue));
    convert();
  }, [from, to, amount, convert, debounceValue, dispatch]);

  return (
    <>
      <div className="flex flex-col gap-8 ">
        <div className="space-y-4 w-full">
          <div className="flex gap-3 items-center">
            <div className="w-1/2">
              <h3 className="font-semibold text-lg">Input Currency Amount</h3>
              <input
                className="px-4 py-2 w-full  border-1 border-gray-300 rounded-md max-w-lg no-arrows"
                type="number"
                step={0.01}
                placeholder="0.00"
                value={amountVal || ""}
                onChange={handleChange}
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

        <p className="text-sm text-gray-400 max-w-lg text-justify">
          We use the mid-market rate for our Converter. This is for
          informational purposes only. You won’t receive this rate when sending
          money.
        </p>
      </div>
    </>
  );
}
