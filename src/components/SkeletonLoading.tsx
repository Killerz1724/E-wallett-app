import clsxm from "@riverfl0w/clsxm";
import React from "react";

type SkeletonLoadingProps = {
  className?: string;
};

export default function SkeletonLoading({ className }: SkeletonLoadingProps) {
  return (
    <div
      className={clsxm(
        "animate-pulse  p-4 max-w-sm w-full mx-auto rounded-md",
        className
      )}
    ></div>
  );
}
