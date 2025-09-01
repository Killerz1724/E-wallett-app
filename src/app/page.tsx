"use client";
import LoadingScreen from "components/LoadingScreen";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useUserDataGet } from "./login/hooks/mutation";

export default function Page() {
  const userData = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const { isPending, isError } = useUserDataGet();
  useEffect(() => {
    if (isPending) return;
    if (!isError) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [userData, router, isPending, isError]);
  return <LoadingScreen />;
}
