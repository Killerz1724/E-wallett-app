import DashboardLayout from "components/DashboardLayout";
import React from "react";
import BalanceTrans from "./components/BalanceTrans";
import TransactionsTable from "./components/TransactionsTable";
import { Metadata } from "next";

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: "Transactions",
  description: "Solution for seamless wallet",
};
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
