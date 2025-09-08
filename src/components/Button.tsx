"us client";
import clsxm from "@riverfl0w/clsxm";
import React from "react";
import { useFormStatus } from "react-dom";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export default function Button({
  children,
  type = "submit",
  className,
  variant = "primary",
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  const { pending } = useFormStatus();

  const isPending = type === "submit" && pending;
  const isDisabled = disabled || isPending || isLoading;
  return (
    <button
      className={clsxm(
        "py-6 px-[8rem] lg:px-[10rem] rounded-lg border-none shadow-2xl hover:cursor-pointer transition-all",
        variant === "primary" && "bg-orange-400 hover:bg-orange-300 text-white",
        variant === "secondary" && "bg-white hover:bg-gray-200 text-black",
        isDisabled && "opacity-50 hover:cursor-not-allowed hover:bg-orange-400",
        className
      )}
      disabled={isDisabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
