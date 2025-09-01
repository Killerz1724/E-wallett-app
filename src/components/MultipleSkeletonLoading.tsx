import React from "react";
import SkeletonLoading from "./SkeletonLoading";

export default function MultipleSkeletonLoading({
  length,
}: {
  length: number;
}) {
  return (
    <div className="space-y-2">
      {Array.from({ length: length }).map((_, i) => (
        <SkeletonLoading key={i} />
      ))}
    </div>
  );
}
