"use client";
import TopupModalContent from "app/topupModal/components/TopupModalContent";
import TransferModalContent from "app/transferModal/components/TransferModalContent";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { closeModal } from "store/modalStore";
import ProfileModalContent from "./profile/ProfileModalContent";
import ChangeLogContent from "app/about/components/ChangeLogContent";

export default function Modal() {
  const { isOpen, content } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  if (!isOpen) return null;
  return (
    <section className="fixed top-0 h-screen w-screen flex items-center z-[80] justify-center">
      <div className="absolute w-full h-full bg-black/50 z-20" />
      <article className="relative max-w-[80%]  pt-10 pb-10 px-8 w-sm lg:min-w-md min-h-64 z-40 bg-white dark:bg-gray-800 rounded-xl">
        <div
          className=" absolute flex  right-2 top-2"
          onClick={() => dispatch(closeModal())}
        >
          <div className=" hover:cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-all">
            <X className="h-10 w-10 text-gray-400" />
          </div>
        </div>
        <div className="w-full max-h-[25rem] overflow-y-auto">
          {content === "TRANSFER" && <TransferModalContent />}
          {content === "TOPUP" && <TopupModalContent />}
          {content === "PROFILE" && <ProfileModalContent />}
          {content === "CHANGE_LOGS" && <ChangeLogContent />}
        </div>
      </article>
    </section>
  );
}
