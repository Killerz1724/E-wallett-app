"use client";
import { BanknoteArrowDown } from "lucide-react";
import { useDispatch } from "react-redux";
import { openModal } from "store/modalStore";

export default function ModalTrigger({ iconMode }: { iconMode?: boolean }) {
  const dispatch = useDispatch();
  return (
    <div
      className="flex items-center gap-4 cursor-pointer hover:bg-white/40 p-2 rounded-md transition-all duration-500 ease-in-out"
      onClick={() => dispatch(openModal("TRANSFER"))}
    >
      {!iconMode && <BanknoteArrowDown className="size-[20px]" />}
      {iconMode ? <BanknoteArrowDown className="size-[20px]" /> : "Transfer"}
    </div>
  );
}
