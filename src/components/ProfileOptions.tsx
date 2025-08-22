"use client";
import clsxm from "@riverfl0w/clsxm";
import { removeToken } from "lib/cookies";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfileOptions() {
  const router = useRouter();
  async function handleLogout() {
    await removeToken();
    router.push("/login");
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="hover:bg-orange-400 font-semibold hover:text-white hover:cursor-pointer p-2 rounded-lg transition-colors">
        See Profile
      </div>
      <div
        className={clsxm(
          "hover:bg-red-500 font-semibold text-red-500 hover:text-white hover:cursor-pointer p-2 rounded-lg transition-colors",
          "flex items-center gap-2"
        )}
        onClick={handleLogout}
      >
        <LogOut />
        Log Out
      </div>
    </div>
  );
}
