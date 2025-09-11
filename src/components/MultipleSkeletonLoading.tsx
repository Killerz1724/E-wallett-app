import React from "react";
import SkeletonLoading from "./SkeletonLoading";

export default function MultipleSkeletonLoading({
  length,
  server = false,
}: {
  length: number;
  server?: boolean;
}) {
  if (server) {
    const comp = Array.from({ length: length }).map((_, i) => (
      <SkeletonLoading key={i} />
    ));
    const options = comp.map((val) => ({ label: val, value: "" }));
    return { comp: comp, options: options };
  }
  return (
    <div className="space-y-2">
      {Array.from({ length: length }).map((_, i) => (
        <SkeletonLoading key={i} />
      ))}
    </div>
  );
}
