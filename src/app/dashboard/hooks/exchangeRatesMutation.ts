import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "lib/axios";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { ApiError, ApiResponse } from "types/api";

type CountriesProps = {
  countries: [
    {
      country_code: string;
    }
  ];
};

export interface ConvertResults {
  From: CountryInfo;
  To: CountryInfo;
  Result: number;
}

export interface CountryInfo {
  CountryCode: string;
  Rates: number;
}

export function useCountriesGet() {
  const res = useQuery<CountriesProps, AxiosError<ApiError>>({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await api.get<ApiResponse<CountriesProps>>(
        "/exchanges-rates/countries"
      );

      return res.data.data;
    },
  });

  return res;
}

export function useConvertGet() {
  const { from, to, amount } = useSelector(
    (state: RootState) => state.user.userExchangeRate
  );

  const res = useMutation<ConvertResults, AxiosError<ApiError>>({
    mutationFn: async () => {
      const amountQ = amount ? amount : 0;
      const res = await api.get<ApiResponse<ConvertResults>>(
        `/exchanges-rates/exchange?from=${from}&to=${to}&value=${amountQ}`
      );

      return res.data.data;
    },
  });

  return res;
}
