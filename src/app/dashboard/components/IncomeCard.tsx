import { ChartNoAxesCombined, TrendingUp } from "lucide-react";
import { getCurrentMonth } from "utils/getCurrentMonth";
import IncomeBalance from "../tinyClientComponent/IncomeBalance";

export default function IncomeCard() {
  return (
    <div className="w-full rounded-2xl bg-gradient-to-br bg-green-600 dark:bg-green-700 to-green-500 border border-orange-200/30 backdrop-blur-xl shadow-lg p-6 flex justify-between items-center gap-3">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <ChartNoAxesCombined className="h-5 w-5 text-white/90" />
          <span className="text-xs lg:text-sm font-medium text-white/80">
            My Income ({getCurrentMonth()})
          </span>
        </div>
        <IncomeBalance />
        <span className="text-xs text-white/70">
          Your total income for this month
        </span>
      </div>
      <div>
        <TrendingUp className="h-16 w-16 lg:h-20 lg:w-20 text-white/90" />
      </div>
    </div>
  );
}
