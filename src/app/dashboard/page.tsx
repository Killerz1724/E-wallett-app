import DashboardLayout from "components/DashboardLayout";
import React from "react";
import BalanceCard from "./components/BalanceCard";
import IncomeCard from "./components/IncomeCard";
import ExpenseCard from "./components/ExpenseCard";
import ExchangeRatesComp from "./components/ExchangeRatesComp";

export default function Dashboardage() {
  return (
    <DashboardLayout>
      <section className="flex flex-col gap-10 w-full">
        <article className="flex gap-4 justify-between">
          <BalanceCard />
          <IncomeCard />
          <ExpenseCard />
        </article>
        <article className="mb-5">
          <h3 className="font-bold text-3xl mb-6">Exchange Rates</h3>
          <ExchangeRatesComp />
        </article>
      </section>
    </DashboardLayout>
  );
}
