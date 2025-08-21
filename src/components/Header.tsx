import React from "react";
import ProfileHeaderIcon from "./ProfileHeaderIcon";
import HeaderTitle from "./HeaderTitle";

export default function Header() {
  return (
    <header className="flex w-full px-8 py-6 justify-between  border-b-1 border-gray-300">
      <HeaderTitle />
      <ProfileHeaderIcon />
    </header>
  );
}
