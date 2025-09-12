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
    <div className="flex flex-col-reverse h-screen md:flex-row w-full dark:bg-gray-900 transition-colors">
      <Sidebar />
      <div className="flex flex-col h-full w-full">
        <Header />
        <div className="flex w-full justify-center overflow-hidden">
          <main className="pt-8 pb-36  px-4 lg:px-8 relative flex flex-col w-full h-screen overflow-y-auto overflow-x-hidden max-w-[750px] lg:max-w-[1600px]">
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}
