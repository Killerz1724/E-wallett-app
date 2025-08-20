"use client";
import clsxm from "@riverfl0w/clsxm";
import React from "react";
import ConverterContent from "./ConverterContent";

export default function ExchangeRatesComp() {
  return (
    <div className="flex flex-col">
      <div className="flex border-gray-300 border-1 rounded-tl-2xl rounded-tr-2xl w-fit">
        <span
          className={clsxm(
            `py-3 px-5 border-r-1 font-semibold rounded-tl-2xl border-gray-300 cursor-pointer `,
            `hover:bg-orange-400 hover:text-white transition-colors`
          )}
        >
          Currency Converter
        </span>
        <span
          className={clsxm(
            `py-3 px-5 border-r-1 font-semibold rounded-tr-2xl border-gray-300 cursor-pointer `,
            `hover:bg-orange-400 hover:text-white transition-colors`
          )}
        >
          Exchange Rates
        </span>
      </div>
      <div className="w-full border-1  border-gray-300 rounded-tr-2xl rounded-b-2xl px-5 py-4">
        <ConverterContent />
      </div>
    </div>
  );
}
