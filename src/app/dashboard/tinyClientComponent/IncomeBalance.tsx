"use client";
import React from "react";
import { useIncomesGet } from "../hooks/mutation";
import SkeletonLoading from "components/SkeletonLoading";
import { COMMON_ERROR } from "constant/common";

export default function IncomeBalance() {
  const { data, isPending, isError } = useIncomesGet();
  const totalIncome = Number(data?.total_income).toLocaleString("id-ID") || 0;
  return (
    <div className="flex items-center gap-2">
      {isPending ? (
        <SkeletonLoading />
      ) : isError ? (
        <p>{COMMON_ERROR}</p>
      ) : (
        <p className="text-4xl font-bold tracking-tight text-white">
          Rp {totalIncome}
        </p>
      )}
    </div>
  );
}
