"use client";
import clsxm from "@riverfl0w/clsxm";
import TopupModalTrigger from "app/topupModal/components/ModalTrigger";
import ModalTrigger from "app/transferModal/components/ModalTrigger";
import {
  ArrowLeftFromLine,
  BanknoteArrowDown,
  BanknoteArrowUp,
  HouseIcon,
  Info,
  LucideProps,
  NotebookText,
} from "lucide-react";
import Link from "next/link";
import { ForwardRefExoticComponent, RefAttributes, useState } from "react";
import Logo from "./Logo";

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
  {
    name: "About",
    path: "/about",
    icon: Info,
  },
];

export default function Sidebar() {
  const [isCollapse, setIsCollapse] = useState(false);
  return (
    <aside
      className={clsxm(
        `md:relative flex flex-col  px-2 w-full  md:w-52  md:rounded-br-lg md:rounded-tr-lg bg-gradient-to-r bg-orange-500 to-orange-400 `,
        "transition-all duration-500 ease-in-out overflow-x-clip",
        "fixed bottom-0 z-50 md:z-0",
        isCollapse && "md:w-20 w-full"
      )}
    >
      <div
        className={clsxm(
          `relative flex flex-col overflow-x-hidden  w-full md:h-full  items-center rounded-br-lg  rounded-tr-lg justify-center`
        )}
      >
        <div className="hidden md:block absolute top-3 right-1">
          {isCollapse ? (
            <Logo variant="whiteIcon" height={40} width={40} />
          ) : (
            <Logo variant="white" />
          )}
        </div>
        <ul
          className={clsxm(
            "flex md:flex-col md:justify-normal md:items-start md:gap-5 overflow-x-hidden",
            "flex-row gap-2 justify-between items-center w-full",
            isCollapse && " md:items-end"
          )}
        >
          {navItems.map((val, i) => (
            <li key={i} className="text-white w-full">
              {val.path ? (
                <Link href={val.path}>
                  <div className="flex overflow-x-hidden flex-col md:flex-row w-full items-center gap-1 md:gap-4 cursor-pointer hover:bg-white/40 p-2 rounded-md transition-all duration-500 ease-in-out">
                    <val.icon className="size-[20px]" />
                    {!isCollapse && (
                      <p className="text-xs md:text-base">{val.name}</p>
                    )}
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
            `absolute bottom-8 right-1 md:right-2 cursor-pointer text-white`,
            "transition-all duration-500 ease-in-out",
            isCollapse && "rotate-180 transition-all duration-500 ease-in-out",
            "hidden md:block"
          )}
        >
          <ArrowLeftFromLine />
        </div>
      </div>
    </aside>
  );
}
