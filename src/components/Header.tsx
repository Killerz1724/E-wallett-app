import React from "react";
import ProfileHeaderIcon from "./ProfileHeaderIcon";
import HeaderTitle from "./HeaderTitle";
import InfoPopout from "./information/InfoPopout";
import NightModeSwitch from "./profile/NightModeSwitch";

export default function Header() {
  return (
    <header className="flex w-full px-8 py-6 items-center justify-between shrink-0 border-b-2 border-gray-300 dark:border-gray-600">
      <HeaderTitle />
      <div className="flex gap-4 md:gap-12 items-center ">
        <NightModeSwitch />
        <InfoPopout />
        <ProfileHeaderIcon />
      </div>
    </header>
  );
}
