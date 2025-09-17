"use client";
import { LucideProps } from "lucide-react";
import React, {
  ForwardRefExoticComponent,
  RefAttributes,
  useState,
} from "react";
import MoreSliderModal from "./MoreSliderModal";
import { AnimatePresence } from "framer-motion";
import { NavItem } from "components/Sidebar";

export default function MoreComp({
  Icon,
  NavItems,
}: {
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  NavItems: NavItem[];
}) {
  const [isCollapse, setIsCollapse] = useState(true);
  return (
    <div>
      <div
        className="flex flex-col md:hidden overflow-x-hidden md:flex-row items-center gap-1 md:gap-4 text-xs md:text-base  cursor-pointer hover:bg-white/40 p-2 rounded-md transition-all duration-500 ease-in-out"
        onClick={() => setIsCollapse(!isCollapse)}
      >
        <Icon className="size-[20px]" />
        <p className="hidden text-xs md:block md:text-base">More</p>
      </div>
      <AnimatePresence>
        {!isCollapse && (
          <MoreSliderModal setClose={setIsCollapse} navItems={NavItems} />
        )}
      </AnimatePresence>
    </div>
  );
}
