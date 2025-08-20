import DashboardLayout from "components/DashboardLayout";
import React from "react";
import BalanceCard from "./components/BalanceCard";
import IncomeCard from "./components/IncomeCard";

export default function page() {
  return (
    <DashboardLayout>
      <section className="flex flex-col gap-10">
        <article className="flex gap-4 justify-between">
          <BalanceCard />
          <IncomeCard />
          <BalanceCard />
        </article>
      </section>
    </DashboardLayout>
  );
}
