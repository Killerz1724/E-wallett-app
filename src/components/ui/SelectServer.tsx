import MultipleSkeletonLoading from "components/MultipleSkeletonLoading";
import { COMMON_ERROR } from "constant/common";
import { JSX } from "react";
import Select, {
  GroupBase,
  OptionsOrGroups,
  Props,
  StylesConfig,
} from "react-select";

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
  value: string | number;
  label: string;
};

export type SelectServerProps = {
  options: OptionsOrGroups<Option, GroupBase<Option>>;
  isPending: boolean;
  isError: boolean;
} & Props;

export default function SelectServer({
  options,
  isPending,
  isError,
  ...props
}: SelectServerProps) {
  const skeletonLoad = MultipleSkeletonLoading({ server: true, length: 5 }) as {
    comp: JSX.Element[];
    options: {
      label: JSX.Element;
      value: string;
    }[];
  };
  const error = { label: { COMMON_ERROR }, value: "" };
  const data = isPending ? skeletonLoad.options : options;
  return (
    <Select
      styles={customStyles}
      options={isError ? [error] : data}
      {...props}
    />
  );
}
