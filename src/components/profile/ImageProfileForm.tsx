import clsxm from "@riverfl0w/clsxm";
import { Pencil } from "lucide-react";
import Image from "next/image";
import React, { Suspense } from "react";

export default function ImageProfileForm({ editMode }: { editMode: boolean }) {
  return (
    <>
      <div
        className={clsxm(
          "relative rounded-full border-1 w-fit",
          editMode && "cursor-pointer"
        )}
      >
        {editMode && (
          <form className="flex absolute w-full rounded-full z-20 bg-gray-100 opacity-50 h-full items-center justify-center">
            <Pencil className="size-15" />
          </form>
        )}
        <Suspense fallback={<p>Loading..</p>}>
          <Image
            src={"/dummy-profile.jpg"}
            alt="profile icon"
            width={100}
            height={100}
            className="rounded-full w-[200px] h-[200px]"
          />
        </Suspense>
      </div>
    </>
  );
}
