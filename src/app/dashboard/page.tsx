import DashboardLayout from "components/DashboardLayout";
import React from "react";
import BalanceCard from "./components/BalanceCard";
import IncomeCard from "./components/IncomeCard";
import ExpenseCard from "./components/ExpenseCard";
import ExchangeRatesComp from "./components/ExchangeRatesComp";
import { Metadata } from "next";

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Solution for seamless wallet",
};

export default function Dashboardage() {
  return (
    <DashboardLayout>
      <section className="flex flex-col gap-10 w-full">
        <article className="flex flex-col lg:flex-row gap-4 justify-between">
          <BalanceCard />
          <IncomeCard />
          <ExpenseCard />
        </article>
        <article className="min-w-[20rem] lg:w-full">
          <h3 className="font-bold text-3xl mb-6">Exchange Rates</h3>
          <ExchangeRatesComp />
        </article>
      </section>
    </DashboardLayout>
  );
}
