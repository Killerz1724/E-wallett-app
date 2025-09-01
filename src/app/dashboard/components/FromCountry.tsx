import { SelectValue } from "@radix-ui/react-select";
import MultipleSkeletonLoading from "components/MultipleSkeletonLoading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "components/ui/Select";
import { COMMON_ERROR } from "constant/common";
import { useCountriesGet } from "../hooks/exchangeRatesMutation";
import { useDispatch, useSelector } from "react-redux";
import { setUserExchangeFrom } from "store/userStore";
import { RootState } from "store";

export default function FromCountry() {
  const { data, isPending, isError } = useCountriesGet();
  const fromDefaultVal = useSelector(
    (state: RootState) => state.user.userExchangeRate.from
  );
  const dispatch = useDispatch();
  return (
    <div>
      <label htmlFor="from">From</label>
      <Select
        onValueChange={(value) => {
          dispatch(setUserExchangeFrom(value));
        }}
        defaultValue={fromDefaultVal}
        value={fromDefaultVal}
        name="from"
      >
        <SelectTrigger>
          <SelectValue placeholder="From" />
        </SelectTrigger>
        <SelectContent align="start" position="popper" className="max-h-48">
          {isPending ? (
            <MultipleSkeletonLoading length={5} />
          ) : isError ? (
            <p>{COMMON_ERROR}</p>
          ) : (
            data &&
            data.countries.map((country) => (
              <SelectItem
                key={country.country_code}
                value={country.country_code}
              >
                {country.country_code}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
