"use client";
import SkeletonLoading from "components/SkeletonLoading";
import { COMMON_ERROR } from "constant/common";
import { useExpenseGet } from "../hooks/mutation";

export default function ExpenseBalance() {
  const { data, isPending, isError } = useExpenseGet();
  const totalExpense = Number(data?.total_expense).toLocaleString("id-ID") || 0;
  return (
    <div className="flex items-center gap-2">
      {isPending ? (
        <SkeletonLoading />
      ) : isError ? (
        <p>{COMMON_ERROR}</p>
      ) : (
        <p className="text-2xl lg:text-4xl font-bold tracking-tight text-white">
          Rp {totalExpense}
        </p>
      )}
    </div>
  );
}
