"use client";
import clsxm from "@riverfl0w/clsxm";
import TopupModalTrigger from "app/topupModal/components/ModalTrigger";
import ModalTrigger from "app/transferModal/components/ModalTrigger";
import {
  ArrowLeftFromLine,
  BanknoteArrowDown,
  BanknoteArrowUp,
  CircleEllipsis,
  Gift,
  HouseIcon,
  Info,
  LucideProps,
  NotebookText,
} from "lucide-react";
import Link from "next/link";
import { ForwardRefExoticComponent, RefAttributes, useState } from "react";
import Logo from "./Logo";
import MoreComp from "./layouts/MoreComp";

export type NavItem = {
  name: string;
  path?: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  hideOnMobile?: boolean;
};

type navItemsProps = {
  nestedNav?: NavItem[];
} & NavItem;

export const NestedNavItems: NavItem[] = [
  {
    name: "About",
    path: "/about",
    icon: Info,
  },
];

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
    name: "Rewards",
    path: "/reward",
    icon: Gift,
  },
  {
    name: "More",
    icon: CircleEllipsis,
  },
  {
    name: "About",
    path: "/about",
    icon: Info,
    hideOnMobile: true,
  },
];

export default function Sidebar() {
  const [isCollapse, setIsCollapse] = useState(false);
  return (
    <aside
      className={clsxm(
        `md:relative md:bottom-0 md:left-0 md:translate-x-0 flex flex-col  px-2 md:py-0 w-full  md:w-52 md:rounded-tl-none md:rounded-bl-none  md:rounded-br-lg md:rounded-tr-lg bg-gradient-to-r dark:bg-gray-700 bg-orange-500   to-orange-400 `,
        "transition-all duration-500 ease-in-out overflow-x-clip",
        "fixed w-[80%] py-4  bottom-6 left-1/2 -translate-x-1/2 z-10 md:z-0 rounded-2xl",
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
          {navItems.map((val, i) => {
            return (
              <li
                key={i}
                className={clsxm(
                  "text-white w-full",
                  val.hideOnMobile && "hidden md:block"
                )}
              >
                {val.path ? (
                  <Link href={val.path}>
                    <div className="flex overflow-x-hidden flex-col md:flex-row w-full items-center gap-1 md:gap-4 cursor-pointer hover:bg-white/40 p-2 rounded-md transition-all duration-500 ease-in-out">
                      <val.icon className="iconSizeNavbar" />
                      {!isCollapse && (
                        <p className="hidden text-xs md:block md:text-base">
                          {val.name}
                        </p>
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
                    {val.name === "More" && <MoreComp Icon={val.icon} />}
                  </div>
                )}
              </li>
            );
          })}
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
