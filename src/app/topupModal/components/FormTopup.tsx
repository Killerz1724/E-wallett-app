import Button from "components/Button";
import SelectServer from "components/SelectServer";
import React from "react";

const dummyOption = [
  {
    value: "bank",
    label: "bank",
  },
  {
    value: "wallet",
    label: "wallet",
  },
];

export default function FormTopup() {
  return (
    <form action="" className="flex flex-col gap-3 w-full">
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="source-fund" className="font-semibold text-sm ">
          Select Method
        </label>
        <SelectServer options={dummyOption} />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="source-fund" className="font-semibold text-sm">
          Amount
        </label>
        <input
          type="number"
          placeholder="ex: 10000"
          step={0.01}
          className="w-full border-1 border-gray-300 rounded-md p-2"
        />
      </div>

      <Button className="py-2">Top Up</Button>
    </form>
  );
}
