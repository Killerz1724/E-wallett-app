"use client";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { useDispatch } from "react-redux";
import { openSliderNav } from "store/sliderNavStore";

export default function MoreComp({
  Icon,
}: {
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}) {
  const dispatch = useDispatch();
  return (
    <div>
      <div
        className="flex flex-col md:hidden overflow-x-hidden md:flex-row items-center gap-1 md:gap-4 text-xs md:text-base  cursor-pointer hover:bg-white/40 p-2 rounded-md transition-all duration-500 ease-in-out"
        onClick={() => dispatch(openSliderNav())}
      >
        <Icon className="iconSizeNavbar" />
        <p className="hidden text-xs md:block md:text-base">More</p>
      </div>
    </div>
  );
}
