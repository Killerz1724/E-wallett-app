import {
  ArrowLeftFromLine,
  BanknoteArrowDown,
  BanknoteArrowUp,
  HouseIcon,
  LucideProps,
  NotebookText,
} from "lucide-react";
import Link from "next/link";
import { ForwardRefExoticComponent, RefAttributes } from "react";

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
  return (
    <aside className="relative flex flex-col pr-16 pl-6 max-w-3xl h-screen items-center rounded-br-lg bg-orange-400 rounded-tr-lg justify-center">
      <ul className="flex flex-col gap-10">
        {navItems.map((val, i) => (
          <li key={i} className="text-white">
            {val.path ? (
              <Link href={val.path}>
                <div className="flex items-center gap-4">
                  <val.icon />
                  <p>{val.name}</p>
                </div>
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                <val.icon />
                <p>{val.name}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="absolute bottom-4 right-4 cursor-pointer text-white">
        <ArrowLeftFromLine />
      </div>
    </aside>
  );
}
