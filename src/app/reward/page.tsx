"use client";
import DashboardLayout from "components/DashboardLayout";
import React from "react";
import GachaWheel from "./components/GachaWheel";
import { useGetRewards } from "./hooks/mutation";
import ProbalitiesPopover from "./components/ProbalitiesPopover";
import SkeletonLoading from "components/SkeletonLoading";
import { COMMON_ERROR } from "constant/common";
import HowToSpin from "./components/HowToSpin";

export default function RewardPage() {
  const { data: rewardList, isPending, isError } = useGetRewards();
  return (
    <DashboardLayout>
      <section className="flex flex-col gap-4">
        <div className="w-full flex justify-between gap-4">
          {isPending ? (
            <SkeletonLoading />
          ) : isError ? (
            <p>{COMMON_ERROR}</p>
          ) : (
            <ProbalitiesPopover rewards={rewardList} />
          )}
          <HowToSpin />
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
