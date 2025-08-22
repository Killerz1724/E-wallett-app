import Image from "next/image";
import React, { Suspense } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";
import ProfileOptions from "./ProfileOptions";

export default function ProfileHeaderIcon() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-4 cursor-pointer">
          <div className="rounded-full border-1">
            <Suspense fallback={<p>Loading..</p>}>
              <Image
                src={"/dummy-profile.jpg"}
                alt="profile icon"
                width={30}
                height={30}
                className="rounded-full"
              />
            </Suspense>
          </div>
          <p className="text-lg font-semibold">Jokowewe</p>
        </div>
      </PopoverTrigger>
      <PopoverContent align="center">
        <ProfileOptions />
      </PopoverContent>
    </Popover>
  );
}
