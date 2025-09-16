"use client";
import clsxm from "@riverfl0w/clsxm";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Prize,
  RewardsTypeRes,
  useGetGacha,
  useGetRewards,
} from "../hooks/mutation";
import SkeletonLoading from "components/SkeletonLoading";
import { COMMON_ERROR } from "constant/common";
import Button from "components/Button";

export default function GachaWheel({
  rewards,
  isRewardsPending,
  isRewardsError,
}: {
  rewards: RewardsTypeRes;
  isRewardsPending: boolean;
  isRewardsError: boolean;
}) {
  const initialPosition = 180;
  const [rotation, setRotation] = useState(initialPosition);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState<Prize>();
  const [segmentWidth, setSegmentWidth] = useState(0);

  const { mutateAsync: getGacha } = useGetGacha();
  const spinControls = useAnimation();
  const numSegments = isRewardsPending ? 0 : rewards.prizes.length;
  const segmentAngles = 360 / numSegments;

  const onSpinStart = async () => {
    if (isSpinning) return;

    setRotation(initialPosition);

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

    // const adjustedAngle =
    //   ((360 - result.prize_angle + pointerOffset) % 360) + centeringOffset;
    const adjustedAngle = result.prize_angle;
    const totalRotation = 360 * randomSpin + initialPosition + adjustedAngle;

    setRotation(totalRotation);

    setTimeout(() => {
      setSelectedPrize(
        rewards.prizes.find((prize) => prize.prize_id === result.prize_id)
      );

      setIsSpinning(false);
    }, 4300);
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

  useEffect(() => {
    if (rotation === initialPosition) {
      spinControls.set({
        rotate: initialPosition,
      });
    } else {
      spinControls.start({
        rotate: -rotation,
        transition: {
          duration: 4,
          ease: "easeOut",
        },
      });
    }
  }, [spinControls, rotation]);

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Spincontainer */}
      <div className="spinWheelContainer ">
        <div className="absolute top-0 left-1/2  -translate-x-1/2 z-20 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[28px] border-transparent border-b-red-600 drop-shadow-lg" />
        {/* Rewards */}
        <motion.div
          className="border-2 border-orange-400 w-[25rem] h-[25rem] relative rounded-full flex items-center justify-center overflow-hidden"
          animate={spinControls}
        >
          {isRewardsPending ? (
            <SkeletonLoading />
          ) : isRewardsError ? (
            <p>{COMMON_ERROR}</p>
          ) : (
            rewards.prizes.map((prize, index) => (
              <div
                key={index}
                className={clsxm(
                  "absolute flex items-center justify-center",
                  selectedPrize === prize
                    ? "bg-green-500"
                    : index % 2 === 0
                    ? "bg-orange-400"
                    : "bg-orange-600",
                  prize.prize_id === 10 &&
                    " bg-gradient-to-tr from-yellow-200 to-yellow-600",
                  prize.prize_id === 9 &&
                    "bg-gradient-to-tr from-purple-200 to-purple-600 ",
                  prize.prize_id === 8 &&
                    " bg-gradient-to-tr from-yellow-700 to-yellow-900"
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
                <span
                  className={clsxm(
                    "rotate-90 text-center text-sm font-bold text-white  bg-orange-300 p-1 rounded mt-5",
                    prize.prize_id >= 8 && "bg-gray-600"
                  )}
                >
                  <p
                    className={clsxm(
                      prize.prize_id === 10 &&
                        "text-transparent bg-clip-text bg-gradient-to-tr from-yellow-200 to-yellow-400",
                      prize.prize_id === 9 &&
                        "text-transparent bg-clip-text bg-gradient-to-tr from-purple-100 to-purple-400",
                      prize.prize_id === 8 &&
                        "text-transparent bg-clip-text bg-gradient-to-tr from-yellow-600 to-yellow-800"
                    )}
                  >
                    {prize.prize_amount.toLocaleString("id-ID")} IDR
                  </p>
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
