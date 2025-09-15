"use client";
import clsxm from "@riverfl0w/clsxm";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Prize, useGetGacha, useGetRewards } from "../hooks/mutation";
import SkeletonLoading from "components/SkeletonLoading";
import { COMMON_ERROR } from "constant/common";
import Button from "components/Button";

export default function GachaWheel() {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState<Prize>();
  const [segmentWidth, setSegmentWidth] = useState(0);
  const {
    data: rewardList,
    isPending: isRewardsPending,
    isError: isRewardsError,
  } = useGetRewards();
  const { mutateAsync: getGacha } = useGetGacha();
  const numSegments = isRewardsPending ? 0 : rewardList.prizes.length;
  const segmentAngles = 360 / numSegments;

  const onSpinStart = async () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedPrize(undefined);
    const result = await getGacha().catch(() => {
      return;
    });

    if (!result) {
      setIsSpinning(false);
      return;
    }

    const minSpins = 3;
    const maxSpins = 6;
    const randomSpin =
      Math.floor(Math.random() * (maxSpins - minSpins + 1)) + minSpins;

    const pointerOffset = 108; // where wheel starts
    const centeringOffset = 2 * segmentAngles; // 72° (2 slices)

    // Final adjustment
    const adjustedAngle =
      ((360 - result.prize_angle + pointerOffset) % 360) + centeringOffset;
    const totalRotation = 360 * randomSpin + adjustedAngle;
    setRotation(totalRotation);

    setTimeout(() => {
      setSelectedPrize(
        rewardList.prizes.find((prize) => prize.prize_id === result.prize_id)
      );

      setIsSpinning(false);
      // normalize rotation so next spin starts clean, but keep alignment
      setRotation(adjustedAngle);
    }, 4200);
  };

  useEffect(() => {
    // Formula 1: radians = degrees * (π/180);
    // Formula 1: SegmentWidth = 2*radiusOfWheel*sin(segmentAngle)/2);
    if (isRewardsPending) return;
    const radius = 150;
    const radians = segmentAngles * (Math.PI / 180);
    const segmentWidth = 2 * radius * Math.sin(radians / 2);
    setSegmentWidth(segmentWidth);
  }, [isRewardsPending]);

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Spincontainer */}
      <div className="spinWheelContainer ">
        <div className="absolute top-0 left-1/2  -translate-x-1/2 z-20 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[28px] border-transparent border-b-red-600 drop-shadow-lg" />
        {/* Rewards */}
        <motion.div
          className="border-2 border-orange-400 w-[25rem] h-[25rem] relative rounded-full flex items-center justify-center overflow-hidden"
          animate={{ rotate: rotation }}
          transition={{ duration: 4, ease: "easeOut" }}
        >
          {isRewardsPending ? (
            <SkeletonLoading />
          ) : isRewardsError ? (
            <p>{COMMON_ERROR}</p>
          ) : (
            rewardList.prizes.map((prize, index) => (
              <div
                key={index}
                className={clsxm(
                  "absolute flex items-center justify-center",
                  selectedPrize === prize
                    ? "bg-green-500"
                    : index % 2 === 0
                    ? "bg-orange-400"
                    : "bg-orange-600"
                )}
                style={{
                  transform: `rotate(${
                    index * segmentAngles
                  }deg) translateY(50%)`,
                  clipPath: "polygon(50% 0%, -8% 100%, 100% 100%)",
                  height: "60%",
                  width: `${1.5 * segmentWidth}px`,
                  zIndex: numSegments - index,
                }}
              >
                <span className="rotate-90 text-center text-sm font-bold text-white bg-orange-300 p-1 rounded mt-5">
                  {prize.prize_amount.toLocaleString("id-ID")} IDR
                </span>
              </div>
            ))
          )}
        </motion.div>
      </div>

      <Button
        onClick={onSpinStart}
        disabled={isSpinning || isRewardsPending || isRewardsError}
      >
        {isSpinning ? "Spinning..." : "Spin"}
      </Button>
      {selectedPrize && (
        <p className="fs-5 fw-semibold text-light">
          You won: {selectedPrize.prize_amount.toLocaleString("id-ID")} IDR!
        </p>
      )}
    </div>
  );
}
