"use client";
import TransferModalContent from "app/transferModal/components/TransferModalContent";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { closeModal } from "store/modalStore";

export default function Modal() {
  const { isOpen, content } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  if (!isOpen) return null;
  return (
    <section className="fixed top-0 h-screen w-screen flex items-center z-20 justify-center">
      <div className="absolute w-full h-full bg-black/50 z-20" />
      <article className="absolute pt-4 pb-10 px-8 min-w-md min-h-64 z-40 bg-white rounded-xl">
        <div
          className="flex w-full justify-end"
          onClick={() => dispatch(closeModal())}
        >
          <div className=" hover:cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-all">
            <X className="h-10 w-10 text-gray-400" />
          </div>
        </div>
        {content === "TRANSFER" && <TransferModalContent />}
      </article>
    </section>
  );
}
