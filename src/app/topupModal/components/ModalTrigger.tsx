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
      className="flex items-center text-sm lg:text-base gap-4 cursor-pointer hover:bg-white/40 p-2 rounded-md transition-all duration-500 ease-in-out"
      onClick={() => dispatch(openModal("TOPUP"))}
    >
      {!iconMode && <BanknoteArrowUp />}
      {iconMode ? <BanknoteArrowUp className="size-[20px]" /> : "Top Up"}
    </div>
  );
}
