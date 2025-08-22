"use client";

import SelectServer from "components/SelectServer";

const dummyOption = [
  { value: "a", label: "a" },
  { value: "b", label: "b" },
  { value: "c", label: "c" },
];

export default function SelectRecipient() {
  function handleChange() {
    console.log("change");
  }
  return <SelectServer options={dummyOption} onInputChange={handleChange} />;
}
