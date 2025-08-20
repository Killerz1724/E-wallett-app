import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header />
        <main className="pt-8 px-8 max-w-[750px] lg:max-w-[1600px]">
          {children}
        </main>
      </div>
    </div>
  );
}
