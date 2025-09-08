import BalanceComp from "components/BalanceComp";
import React from "react";

export default function BalanceTrans() {
  return (
    <article className="flex flex-col gap-1">
      <BalanceComp style="black" />
      <p className="text-sm lg:text-base opacity-45">
        Total balance from account 8000000000
      </p>
    </article>
  );
}
