import Select, { GroupBase, Props, StylesConfig } from "react-select";

const customStyles: StylesConfig = {
  option: (provided, state) => ({
    ...provided,
    marginBottom: "8px",
    backgroundColor: state.isSelected
      ? "#f97316"
      : state.isFocused
      ? "var(--color-orange-300)"
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
  menu: (provided) => ({
    ...provided,
    padding: "8px",
  }),
};

type Option = {
  value: string;
  label: string;
};

export default function SelectServer(
  props: Props<Option, false, GroupBase<Option>>
) {
  return <Select styles={customStyles} {...props} />;
}
