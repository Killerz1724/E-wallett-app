import MultipleSkeletonLoading from "components/MultipleSkeletonLoading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/Select";
import { COMMON_ERROR } from "constant/common";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setUserRatesQuery } from "store/userStore";
import { useCountriesGet } from "../hooks/exchangeRatesMutation";

export default function CountryRatesSelect() {
  const { data, isPending, isError } = useCountriesGet();
  const fromDefaultVal = useSelector(
    (state: RootState) => state.user.userExchangeRate.rates_query
  );
  const dispatch = useDispatch();
  const MultipleSkeletonLoad = MultipleSkeletonLoading({
    server: false,
    length: 5,
  }) as React.JSX.Element;
  return (
    <div>
      <label htmlFor="rates-select">From</label>
      <Select
        onValueChange={(value) => {
          dispatch(setUserRatesQuery(value));
        }}
        defaultValue={fromDefaultVal}
        value={fromDefaultVal}
        name="rates-select"
      >
        <SelectTrigger>
          <SelectValue placeholder="From" />
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
