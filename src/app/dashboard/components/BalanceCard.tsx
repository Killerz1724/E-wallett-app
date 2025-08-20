import { Eye, Wallet } from "lucide-react";
import React from "react";

export default function BalanceCard() {
  const balance = 500000;
  return (
    <div className="w-full rounded-2xl bg-orange-500 to-orange-300 border border-orange-200/30 backdrop-blur-xl shadow-lg p-6 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Wallet className="h-5 w-5 text-white/90" />
        <span className="text-sm font-medium text-white/80">My Balance</span>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-4xl font-bold tracking-tight text-white">
          Rp {balance.toLocaleString("id-ID")}
        </p>
        <Eye className="h-7 w-7 text-white/90 cursor-pointer" />
      </div>
      <span className="text-xs text-white/70">Available in your wallet</span>
    </div>
  );
}
