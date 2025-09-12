import clsxm from "@riverfl0w/clsxm";
import MultipleSkeletonLoading from "components/MultipleSkeletonLoading";
import { COMMON_ERROR } from "constant/common";
import { JSX } from "react";
import Select, { GroupBase, OptionsOrGroups, Props } from "react-select";

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
      classNames={{
        option(props) {
          return clsxm(
            props.isSelected
              ? "dark:!bg-orange-600 !bg-orange-400  !text-white rounded-md"
              : props.isFocused
              ? " dark:!bg-orange-600 !bg-orange-400 !text-white rounded-md"
              : "bg-white bg-orange-400 text-black",
            "mb-2"
          );
        },
        control(props) {
          return clsxm(
            "rounded-md bg-white  dark:bg-gray-200 dark:text-gray-100 !boder-orange-400 p-1",
            props.isFocused && "!border-2 !border-orange-400 ",
            props.menuIsOpen && "!border-2 !border-orange-400 "
          );
        },
        menu(props) {
          return clsxm("bg-white dark:bg-gray-600 rounded-md p-2");
        },
      }}
      options={isError ? [error] : data}
      {...props}
    />
  );
}
