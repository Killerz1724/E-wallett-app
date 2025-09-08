import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

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
          <main className="pt-8 px-8 relative flex flex-col w-full h-dvh overflow-y-auto overflow-x-hidden max-w-[750px] lg:max-w-[1600px]">
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}
