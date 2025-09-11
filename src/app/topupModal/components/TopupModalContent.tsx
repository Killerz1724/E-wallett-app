import React from "react";
import FormTopup from "./FormTopup";

export default function TopupModalContent() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <h5 className="text-3xl font-bold">Top Up</h5>
      <FormTopup />
    </div>
  );
}
