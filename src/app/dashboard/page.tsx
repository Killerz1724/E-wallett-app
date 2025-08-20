import DashboardLayout from "components/DashboardLayout";
import React from "react";
import BalanceCard from "./components/BalanceCard";
import IncomeCard from "./components/IncomeCard";
import ExpenseCard from "./components/ExpenseCard";

export default function page() {
  return (
    <DashboardLayout>
      <section className="flex flex-col gap-10">
        <article className="flex gap-4 justify-between">
          <BalanceCard />
          <IncomeCard />
          <ExpenseCard />
        </article>
      </section>
    </DashboardLayout>
  );
}
