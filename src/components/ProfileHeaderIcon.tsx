import Image from "next/image";
import React, { Suspense } from "react";

export default function ProfileHeaderIcon() {
  return (
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
  );
}
