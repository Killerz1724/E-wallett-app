"use client";
import { BanknoteArrowDown } from "lucide-react";
import { useDispatch } from "react-redux";
import { openModal } from "store/modalStore";

export default function ModalTrigger({ iconMode }: { iconMode?: boolean }) {
  const dispatch = useDispatch();
  return (
    <div
      className="flex flex-col overflow-x-hidden md:flex-row text-xs md:text-base items-center gap-1 md:gap-4 cursor-pointer hover:bg-white/40 p-2 rounded-md transition-all duration-500 ease-in-out"
      onClick={() => dispatch(openModal("TRANSFER"))}
    >
      {!iconMode && <BanknoteArrowDown className="iconSizeNavbar" />}
      {iconMode ? (
        <BanknoteArrowDown className="iconSizeNavbar" />
      ) : (
        <p className="hidden text-xs md:block md:text-base">Transfer</p>
      )}
    </div>
  );
}
