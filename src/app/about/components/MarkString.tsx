import React, { ReactNode } from "react";

export default function MarkString({ children }: { children: ReactNode }) {
  return <strong className="text-orange-400">{children}</strong>;
}
