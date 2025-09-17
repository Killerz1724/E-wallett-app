import { NavItem } from "components/Sidebar";
import Link from "next/link";
import React from "react";

export default function NestedNavItems({ navItems }: { navItems: NavItem[] }) {
  return (
    <div className="grid grid-cols-4">
      {navItems.map((item, i) => {
        return (
          <Link key={i} href={item.path}>
            <div className="flex flex-col  md:hidden overflow-x-hidden md:flex-row items-center gap-1 md:gap-4 text-base  cursor-pointer hover:bg-white/40 py-2 px-4 rounded-md transition-all duration-500 ease-in-out">
              {<item.icon className="size-[30px] " />}
              <p>{item.name}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
