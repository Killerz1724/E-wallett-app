import clsxm from "@riverfl0w/clsxm";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, Suspense } from "react";

export default function ImageProfileForm({
  editMode,
  imgUrl,
  handleChange,
}: {
  editMode: boolean;
  imgUrl?: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <div className={clsxm("relative rounded-full border-2 w-fit")}>
        {editMode && (
          <form className="flex absolute w-full rounded-full z-20 bg-gray-100 opacity-70 h-full items-center justify-center ">
            <label htmlFor="profImage" className="cursor-pointer">
              <Pencil className="size-14 text-orange-400 " />
            </label>
            <input
              type="file"
              name="profImage"
              id="profImage"
              className="hidden"
              onChange={handleChange}
            />
          </form>
        )}
        <Suspense fallback={<p>Loading..</p>}>
          <Image
            src={imgUrl || "/dummy-profile.jpg"}
            alt="profile icon"
            width={100}
            height={100}
            className="rounded-full w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] object-cover"
          />
        </Suspense>
      </div>
    </>
  );
}
