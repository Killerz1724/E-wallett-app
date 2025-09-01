import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/Select";
import React from "react";
import { useCountriesGet } from "../hooks/exchangeRatesMutation";
import SkeletonLoading from "components/SkeletonLoading";
import { COMMON_ERROR } from "constant/common";

export default function ToCountry() {
  const { data, isPending, isError } = useCountriesGet();
  return (
    <div>
      <label htmlFor="to">To</label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="To" />
        </SelectTrigger>
        <SelectContent align="start" position="popper" className="max-h-48">
          {isPending ? (
            <SkeletonLoading />
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
