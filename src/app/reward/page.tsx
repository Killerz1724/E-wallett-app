"use client";
import DashboardLayout from "components/DashboardLayout";
import React from "react";
import GachaWheel from "./components/GachaWheel";
import { useGetRewards } from "./hooks/mutation";
import ProbalitiesPopover from "./components/ProbalitiesPopover";
import SkeletonLoading from "components/SkeletonLoading";
import { COMMON_ERROR } from "constant/common";

export default function RewardPage() {
  const { data: rewardList, isPending, isError } = useGetRewards();
  return (
    <DashboardLayout>
      <section className="flex flex-col gap-4">
        <div className="w-full flex justify-end">
          {isPending ? (
            <SkeletonLoading />
          ) : isError ? (
            <p>{COMMON_ERROR}</p>
          ) : (
            <ProbalitiesPopover rewards={rewardList} />
          )}
        </div>
        <GachaWheel
          rewards={rewardList}
          isRewardsError={isError}
          isRewardsPending={isPending}
        />
      </section>
    </DashboardLayout>
  );
}
