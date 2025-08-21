"use client";
import { BanknoteArrowDown } from "lucide-react";
import { useDispatch } from "react-redux";
import { openModal } from "store/modalStore";

export default function ModalTrigger({ iconMode }: { iconMode?: boolean }) {
  const dispatch = useDispatch();
  return (
    <div onClick={() => dispatch(openModal("TRANSFER"))}>
      {iconMode ? <BanknoteArrowDown /> : "Transfer"}
    </div>
  );
}
