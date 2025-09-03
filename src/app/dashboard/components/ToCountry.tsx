import MultipleSkeletonLoading from "components/MultipleSkeletonLoading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/Select";
import { COMMON_ERROR } from "constant/common";
import { useCountriesGet } from "../hooks/exchangeRatesMutation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setUserExchangeTo } from "store/userStore";

export default function ToCountry() {
  const { data, isPending, isError } = useCountriesGet();
  const MultipleSkeletonLoad = MultipleSkeletonLoading({
    server: false,
    length: 5,
  }) as React.JSX.Element;
  const toDefaultVal = useSelector(
    (state: RootState) => state.user.userExchangeRate.to
  );
  const dispatch = useDispatch();
  return (
    <div>
      <label htmlFor="to">To</label>
      <Select
        onValueChange={(value) => dispatch(setUserExchangeTo(value))}
        defaultValue={toDefaultVal}
        value={toDefaultVal}
        name="to"
      >
        <SelectTrigger>
          <SelectValue placeholder="To" />
        </SelectTrigger>
        <SelectContent align="start" position="popper" className="max-h-48">
          {isPending ? (
            MultipleSkeletonLoad
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
