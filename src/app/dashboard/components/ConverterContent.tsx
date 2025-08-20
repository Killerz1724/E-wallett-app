import React from "react";
import FromCountry from "./FromCountry";
import ToCountry from "./ToCountry";

export default function ConverterContent() {
  return (
    <>
      <div className="flex gap-4 items-end">
        <div className="space-y-4 w-full">
          <h3 className="font-semibold text-lg">Input Currency Amount</h3>
          <div className="flex gap-3 items-center">
            <input
              className="px-4 py-2 w-full  border-1 border-gray-300 rounded-md max-w-lg"
              placeholder="0.00"
            />
            <FromCountry />
            <ToCountry />
          </div>
        </div>
      </div>
    </>
  );
}
