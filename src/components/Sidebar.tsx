"use client";
import clsxm from "@riverfl0w/clsxm";
import TopupModalTrigger from "app/topupModal/components/ModalTrigger";
import ModalTrigger from "app/transferModal/components/ModalTrigger";
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
    name: "Dashboard",
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
        `relative flex flex-col  w-full h-full  items-center rounded-br-lg  rounded-tr-lg justify-center`,
        `relative flex flex-col  w-54 h-screen rounded-br-lg bg-gradient-to-r bg-orange-600 to-orange-500 rounded-tr-lg  `,
        isCollapse && "w-20",
        "transition-all duration-500 ease-in-out"
      )}
    >
      <div
        className={clsxm(
          `relative flex flex-col  w-full h-full  items-center rounded-br-lg  rounded-tr-lg justify-center`,
          "bg-white/30   backdrop-filter backdrop-blur-2xl  border border-gray-100"
        )}
      >
        <ul className="flex flex-col gap-5">
          {navItems.map((val, i) => (
            <li key={i} className="text-white">
              {val.path ? (
                <Link href={val.path}>
                  <div className="flex items-center gap-4 cursor-pointer hover:bg-white/40 p-2 rounded-md transition-all duration-500 ease-in-out">
                    <val.icon />
                    {!isCollapse && <p>{val.name}</p>}
                  </div>
                </Link>
              ) : (
                <div>
                  {val.name === "Transfer" && (
                    <ModalTrigger iconMode={isCollapse} />
                  )}
                  {val.name === "TopUp" && (
                    <TopupModalTrigger iconMode={isCollapse} />
                  )}
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
      </div>
    </aside>
  );
}
