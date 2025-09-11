import BalanceComp from "components/BalanceComp";
import { Wallet } from "lucide-react";

export default function BalanceCard() {
  return (
    <div className="w-full rounded-2xl bg-gradient-to-br bg-orange-500 to-orange-400 border border-orange-200/30 backdrop-blur-xl shadow-lg p-6 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Wallet className="h-5 w-5 text-white/90" />
        <span className="text-sm font-medium text-white/80">My Balance</span>
      </div>
      <BalanceComp />
      <span className="text-xs text-white/70">Available in your wallet</span>
    </div>
  );
}
