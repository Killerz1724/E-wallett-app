import React from "react";
import ProfileHeaderIcon from "./ProfileHeaderIcon";

export default function Header() {
  return (
    <header className="flex w-full pr-8 py-6 justify-end  border-b-1 border-gray-300">
      <ProfileHeaderIcon />
    </header>
  );
}
