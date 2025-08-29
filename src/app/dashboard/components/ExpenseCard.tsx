import { ChartNoAxesCombined, TrendingDown } from "lucide-react";
import React from "react";
import { getCurrentMonth } from "utils/getCurrentMonth";
import ExpenseBalance from "../tinyClientComponent/ExpenseBalance";

export default function ExpenseCard() {
  return (
    <div className="w-full rounded-2xl bg-gradient-to-br bg-red-600 to-red-500 border border-orange-200/30 backdrop-blur-xl shadow-lg p-6 flex justify-between items-center gap-3">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <ChartNoAxesCombined className="h-5 w-5 text-white/90" />
          <span className="text-sm font-medium text-white/80">
            My Expense ({getCurrentMonth()})
          </span>
        </div>
        <ExpenseBalance />
        <span className="text-xs text-white/70">
          Your total expenses for this month
        </span>
      </div>
      <div>
        <TrendingDown className="h-20 w-20 text-white/90" />
      </div>
    </div>
  );
}
