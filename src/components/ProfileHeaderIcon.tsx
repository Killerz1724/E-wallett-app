"use client";
import Image from "next/image";
import React, { Suspense } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";
import ProfileOptions from "./ProfileOptions";
import { useSelector } from "react-redux";
import { RootState } from "store";

export default function ProfileHeaderIcon() {
  const [open, setOpen] = React.useState(false);
  const userData = useSelector((state: RootState) => state.user);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <div className="rounded-full w-12 h-12 border-1 relative">
            <Suspense fallback={<p>Loading..</p>}>
              <Image
                src={
                  userData.userData.profilPic
                    ? userData.userData.profilPic
                    : "/dummy-profile.jpg"
                }
                alt="profile icon"
                fill
                className="rounded-full object-contain"
              />
            </Suspense>
          </div>
          <p className="text-lg font-semibold">{userData.userData.username}</p>
        </div>
      </PopoverTrigger>
      <PopoverContent align="center">
        <ProfileOptions handleCloseAction={() => setOpen(false)} />
      </PopoverContent>
    </Popover>
  );
}
