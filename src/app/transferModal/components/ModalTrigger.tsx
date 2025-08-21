"use client";
import { useDispatch } from "react-redux";
import { openModal } from "store/modalStore";

export default function ModalTrigger() {
  const dispatch = useDispatch();
  return (
    <div onClick={() => dispatch(openModal("TRANSFER"))}>TransferModal</div>
  );
}
