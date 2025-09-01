import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "lib/axios";
import { ApiError, ApiResponse } from "types/api";

type CountriesProps = {
  countries: [
    {
      country_code: string;
    }
  ];
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
