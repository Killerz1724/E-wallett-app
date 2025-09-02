import SkeletonLoading from "components/SkeletonLoading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/Table";
import { COMMON_ERROR } from "constant/common";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { useRatesGet } from "../hooks/exchangeRatesMutation";
import CountryRatesSelect from "./CountryRatesSelect";
import Pagination from "components/ui/Pagination";
import { setUserRatesPage } from "store/userStore";

export default function RatesContent() {
  const { data, isPending, isError, refetch } = useRatesGet();
  const { rates_query: ratesQ, page_rates: pageQ } = useSelector(
    (state: RootState) => state.user.userExchangeRate
  );
  const dispatch = useDispatch();
  const currentPage = data ? data.page_info.current_page : 1;
  const limit = data ? data.page_info.limit_data_per_page : 0;
  const calc = (currentPage - 1) * limit;
  const startNumber = calc === 0 ? 1 : calc;
  useEffect(() => {
    refetch();
  }, [refetch, ratesQ, pageQ]);
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex w-full justify-end">
        <CountryRatesSelect />
      </div>
      {isPending ? (
        <SkeletonLoading className="w-full min-h-[300px]" />
      ) : isError ? (
        <p>{COMMON_ERROR}</p>
      ) : (
        data && (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Rates</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.rates.map((rate, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell>{startNumber + i}</TableCell>
                      <TableCell>
                        {rate.rates} {rate.country_code}
                      </TableCell>
                      <TableCell>1 {ratesQ}</TableCell>
                      <TableCell>{rate.country_code}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <div className="w-full flex justify-end">
              <Pagination
                limit={data.page_info.limit_data_per_page}
                page={data.page_info.current_page}
                total={data.page_info.total_rows}
                next={() =>
                  dispatch(setUserRatesPage(data.page_info.current_page + 1))
                }
                previous={() =>
                  dispatch(setUserRatesPage(data.page_info.current_page - 1))
                }
              />
            </div>
          </>
        )
      )}
    </div>
  );
}
