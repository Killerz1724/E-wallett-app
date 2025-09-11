import React from "react";
import ProfileHeaderIcon from "./ProfileHeaderIcon";
import HeaderTitle from "./HeaderTitle";
import InfoPopout from "./information/InfoPopout";

export default function Header() {
  return (
    <header className="flex w-full px-8 py-6 justify-between shrink-0 border-b-2 border-gray-300">
      <HeaderTitle />
      <div className="flex gap-12 items-center ">
        <InfoPopout />
        <ProfileHeaderIcon />
      </div>
    </header>
  );
}
