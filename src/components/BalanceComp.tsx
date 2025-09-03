"use client";
import clsxm from "@riverfl0w/clsxm";
import { Eye, EyeClosed } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setUserSeeBalance } from "store/userStore";

export default function BalanceComp({
  style = "white",
}: {
  style?: "black" | "white";
}) {
  const isOpen = useSelector(
    (state: RootState) => state.user.userBehaviour.seeBalance
  );
  const dispatch = useDispatch();
  const userBalance = useSelector(
    (state: RootState) => state.user.userData.balance
  );
  return (
    <div className="flex items-center gap-2">
      <p
        className={clsxm(
          `text-4xl font-bold tracking-tight`,
          style === "black" && "text-black",
          style === "white" && "text-white"
        )}
      >
        {isOpen ? (
          <>Rp {Number(userBalance).toLocaleString("id-ID")}</>
        ) : (
          "**********"
        )}
      </p>
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
