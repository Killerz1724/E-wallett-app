import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex w-full justify-center overflow-hidden">
          <main className="pt-8 px-8 flex w-full overflow-y-auto   max-w-[750px] lg:max-w-[1600px]">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
