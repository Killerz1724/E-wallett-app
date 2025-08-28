"use client";
import clsxm from "@riverfl0w/clsxm";
import { Eye, EyeClosed } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";

export default function BalanceComp({
  style = "white",
}: {
  style?: "black" | "white";
}) {
  const [showBalance, setShowBalance] = useState(false);
  const userBalance = useSelector((state: RootState) => state.user.balance);
  return (
    <div className="flex items-center gap-2">
      <p
        className={clsxm(
          `text-4xl font-bold tracking-tight`,
          style === "black" && "text-black",
          style === "white" && "text-white"
        )}
      >
        {showBalance ? (
          <>Rp {userBalance.toLocaleString("id-ID")}</>
        ) : (
          "**********"
        )}
      </p>
      {showBalance ? (
        <Eye
          className={clsxm(
            "h-7 w-7  cursor-pointer",
            style === "black" && "text-black",
            style === "white" && "text-white"
          )}
          onClick={() => setShowBalance((prev) => !prev)}
        />
      ) : (
        <EyeClosed
          className={clsxm(
            "h-7 w-7  cursor-pointer",
            style === "black" && "text-black",
            style === "white" && "text-white"
          )}
          onClick={() => setShowBalance((prev) => !prev)}
        />
      )}
    </div>
  );
}
