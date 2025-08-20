import { ChartNoAxesCombined, TrendingUp } from "lucide-react";
import { getCurrentMonth } from "utils/getCurrentMonth";

export default function IncomeCard() {
  const balance = 500000;

  return (
    <div className="w-full rounded-2xl bg-gradient-to-br bg-green-600 to-green-500 border border-orange-200/30 backdrop-blur-xl shadow-lg p-6 flex justify-between items-center gap-3">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <ChartNoAxesCombined className="h-5 w-5 text-white/90" />
          <span className="text-sm font-medium text-white/80">
            My Income ({getCurrentMonth()})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-4xl font-bold tracking-tight text-white">
            Rp {balance.toLocaleString("id-ID")}
          </p>
        </div>
        <span className="text-xs text-white/70">
          Your total income for this month
        </span>
      </div>
      <div>
        <TrendingUp className="h-20 w-20 text-white/90" />
      </div>
    </div>
  );
}
