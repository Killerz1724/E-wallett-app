"use client";
import clsxm from "@riverfl0w/clsxm";
import { useBalanceGet } from "app/dashboard/hooks/mutation";
import { COMMON_ERROR } from "constant/common";
import { Eye, EyeClosed } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setUserSeeBalance } from "store/userStore";
import SkeletonLoading from "./SkeletonLoading";

export default function BalanceComp({
  style = "white",
}: {
  style?: "black" | "white";
}) {
  const isOpen = useSelector(
    (state: RootState) => state.user.userBehaviour.seeBalance
  );
  const { data, isPending, isError } = useBalanceGet();
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-2">
      {isPending ? (
        <SkeletonLoading />
      ) : isError ? (
        <p>{COMMON_ERROR}</p>
      ) : (
        <p
          className={clsxm(
            `text-4xl font-bold tracking-tight`,
            style === "black" && "text-black",
            style === "white" && "text-white"
          )}
        >
          {isOpen ? (
            <>Rp {Number(data.balance).toLocaleString("id-ID")}</>
          ) : (
            "**********"
          )}
        </p>
      )}

      {isOpen ? (
        <Eye
          className={clsxm(
            "h-7 w-7  cursor-pointer",
            style === "black" && "text-black",
            style === "white" && "text-white"
          )}
          onClick={() => dispatch(setUserSeeBalance())}
        />
      ) : (
        <EyeClosed
          className={clsxm(
            "h-7 w-7  cursor-pointer",
            style === "black" && "text-black",
            style === "white" && "text-white"
          )}
          onClick={() => dispatch(setUserSeeBalance())}
        />
      )}
    </div>
  );
}
