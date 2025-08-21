import React from "react";
import FromCountry from "./FromCountry";
import ToCountry from "./ToCountry";
import { ArrowLeftRight } from "lucide-react";

export default function ConverterContent() {
  const result = 500000;
  return (
    <>
      <div className="flex flex-col gap-8 ">
        <div className="space-y-4 w-full">
          <div className="flex gap-3 items-center">
            <div className="w-1/2">
              <h3 className="font-semibold text-lg">Input Currency Amount</h3>
              <input
                className="px-4 py-2 w-full  border-1 border-gray-300 rounded-md max-w-lg"
                type="number"
                step={0.01}
                placeholder="0.00"
              />
            </div>
            <div className="flex items-center gap-4">
              <FromCountry />
              <ArrowLeftRight className="cursor-pointer" />
              <ToCountry />
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <span className="font-semibold text-sm text-gray-400">1 USD = </span>
          <p className="text-4xl font-bold">
            Rp. {result.toLocaleString("id-ID")}
          </p>
          <span className="font-semibold text-sm text-gray-400">
            1 USD = 16.000 IDR{" "}
          </span>
        </div>
        <p className="text-sm text-gray-400 max-w-lg text-justify">
          We use the mid-market rate for our Converter. This is for
          informational purposes only. You won’t receive this rate when sending
          money.
        </p>
      </div>
    </>
  );
}
