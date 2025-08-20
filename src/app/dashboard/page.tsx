import DashboardLayout from "components/DashboardLayout";
import React from "react";
import BalanceCard from "./components/BalanceCard";

export default function page() {
  return (
    <DashboardLayout>
      <section className="flex flex-col gap-10">
        <article className="flex gap-4 justify-between">
          <BalanceCard />
          <BalanceCard />
          <BalanceCard />
        </article>
      </section>
    </DashboardLayout>
  );
}
