import { BanknoteArrowUp } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "store/modalStore";

export default function TopupModalTrigger({
  iconMode,
}: {
  iconMode?: boolean;
}) {
  const dispatch = useDispatch();
  return (
    <div
      className="flex flex-col overflow-x-hidden md:flex-row items-center gap-1 md:gap-4 text-xs md:text-base  cursor-pointer hover:bg-white/40 p-2 rounded-md transition-all duration-500 ease-in-out"
      onClick={() => dispatch(openModal("TOPUP"))}
    >
      {!iconMode && <BanknoteArrowUp className="size-[20px]" />}
      {iconMode ? (
        <BanknoteArrowUp className="size-[20px]" />
      ) : (
        <p className="hidden text-xs md:block md:text-base">Top Up</p>
      )}
    </div>
  );
}
