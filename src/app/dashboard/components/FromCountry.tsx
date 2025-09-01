import { SelectValue } from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "components/ui/Select";
import React from "react";
import { useCountriesGet } from "../hooks/exchangeRatesMutation";
import SkeletonLoading from "components/SkeletonLoading";
import { COMMON_ERROR } from "constant/common";

export default function FromCountry() {
  const { data, isPending, isError } = useCountriesGet();
  return (
    <div>
      <label htmlFor="from">From</label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="From" />
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
