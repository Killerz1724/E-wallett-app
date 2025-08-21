import DashboardLayout from "components/DashboardLayout";
import React from "react";
import BalanceTrans from "./components/BalanceTrans";
import TransactionsTable from "./components/TransactionsTable";

export default function TransactionsPage() {
  return (
    <DashboardLayout>
      <section className="flex flex-col w-full gap-4">
        <BalanceTrans />
        <TransactionsTable />
      </section>
    </DashboardLayout>
  );
}
