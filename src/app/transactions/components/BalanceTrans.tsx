"use client";
import BalanceComp from "components/BalanceComp";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";

export default function BalanceTrans() {
  const walletId = useSelector(
    (state: RootState) => state.user.userData.walletNumber
  );
  return (
    <article className="flex flex-col gap-1">
      <BalanceComp style="black" />
      <p className="text-sm lg:text-base opacity-45">
        Total balance from account {walletId}
      </p>
    </article>
  );
}
