"use client";
import clsxm from "@riverfl0w/clsxm";
import {
  ArrowLeftFromLine,
  BanknoteArrowDown,
  BanknoteArrowUp,
  HouseIcon,
  LucideProps,
  NotebookText,
} from "lucide-react";
import Link from "next/link";
import { ForwardRefExoticComponent, RefAttributes, useState } from "react";

type navItemsProps = {
  name: string;
  path?: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

const navItems: navItemsProps[] = [
  {
    name: "Home",
    path: "/dashboard",
    icon: HouseIcon,
  },
  {
    name: "Transactions",
    path: "/transactions",
    icon: NotebookText,
  },
  {
    name: "Transfer",
    icon: BanknoteArrowDown,
  },
  {
    name: "TopUp",
    icon: BanknoteArrowUp,
  },
];

export default function Sidebar() {
  const [isCollapse, setIsCollapse] = useState(false);
  return (
    <aside
      className={clsxm(
        `relative flex flex-col  w-54 h-screen items-center rounded-br-lg bg-orange-400 rounded-tr-lg justify-center`,
        isCollapse && "w-20",
        "transition-all duration-500 ease-in-out"
      )}
    >
      <ul className="flex flex-col gap-10">
        {navItems.map((val, i) => (
          <li key={i} className="text-white">
            {val.path ? (
              <Link href={val.path}>
                <div className="flex items-center gap-4">
                  <val.icon />
                  {!isCollapse && <p>{val.name}</p>}
                </div>
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                <val.icon />
                {!isCollapse && <p>{val.name}</p>}
              </div>
            )}
          </li>
        ))}
      </ul>
      <div
        onClick={() => setIsCollapse(!isCollapse)}
        className={clsxm(
          `absolute bottom-4 right-4 cursor-pointer text-white`,
          "transition-all duration-500 ease-in-out",
          isCollapse && "rotate-180 transition-all duration-500 ease-in-out"
        )}
      >
        <ArrowLeftFromLine />
      </div>
    </aside>
  );
}
