import { useMutation, useQuery } from "@tanstack/react-query";
import { PageInfo } from "app/transactions/components/TransactionsTable";
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

export type ConvertResults = {
  From: CountryInfo;
  To: CountryInfo;
  Result: number;
};

export type CountryInfo = {
  CountryCode: string;
  Rates: number;
};

export type RatesResponse = {
  page_info: PageInfo;
  rates: {
    country_code: string;
    rates: number;
  }[];
};

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

export function useRatesGet() {
  const { rates_query: ratesQ, page_rates } = useSelector(
    (state: RootState) => state.user.userExchangeRate
  );

  const pageQ = page_rates ? page_rates : 1;
  const res = useQuery<RatesResponse, AxiosError<ApiError>>({
    queryKey: ["rates"],
    queryFn: async () => {
      const res = await api.get<ApiResponse<RatesResponse>>(
        `/exchanges-rates/rates?country_code=${ratesQ}&page=${pageQ}`
      );

      return res.data.data;
    },
  });
  return res;
}
