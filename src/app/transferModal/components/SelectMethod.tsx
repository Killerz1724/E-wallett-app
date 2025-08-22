"use client";
import Select, { StylesConfig } from "react-select";

const dummyOption = [
  { value: "a", label: "a" },
  { value: "b", label: "b" },
  { value: "c", label: "c" },
];

const customStyles: StylesConfig = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#f97316"
      : state.isFocused
      ? "orange"
      : "white",
    color: state.isSelected ? "white" : state.isFocused ? "white" : "black",
    borderRadius: "0.5rem",
    cursor: "pointer",
  }),
  control: (provided) => ({
    ...provided,
    borderRadius: "0.5rem",
    borderColor: "#e5e7eb",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#f97316",
    },
  }),
};

export default function SelectRecipient() {
  function handleChange() {
    console.log("change");
  }
  return (
    <Select
      options={dummyOption}
      styles={customStyles}
      onInputChange={handleChange}
    />
  );
}
