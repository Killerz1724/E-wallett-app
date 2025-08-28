"use client";
import LoadingScreen from "components/LoadingScreen";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";

export default function Page() {
  const userData = useSelector((state: RootState) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (userData.username) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [userData, router]);
  return <LoadingScreen />;
}
