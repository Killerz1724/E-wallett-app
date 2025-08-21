"use client";
import { usePathname } from "next/navigation";
import React from "react";

export default function HeaderTitle() {
  const currentPath = usePathname().split("/")[1];
  return <h3 className="font-bold text-2xl ">{currentPath.toUpperCase()}</h3>;
}
