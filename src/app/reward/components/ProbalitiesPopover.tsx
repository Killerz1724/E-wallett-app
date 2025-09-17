import { Popover, PopoverContent, PopoverTrigger } from "components/ui/Popover";
import React from "react";
import { RewardsTypeRes } from "../hooks/mutation";
import { TOTAL_PRIZE_WEIGHT_PERCENTAGE } from "constant/common";

export default function ProbalitiesPopover({
  rewards,
}: {
  rewards: RewardsTypeRes;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="p-2 rounded-md text-white bg-orange-400 hover:bg-orange-500 hover:cursor-pointer">
          Probabilites
        </div>
      </PopoverTrigger>
      <PopoverContent className="">
        <div className="grid grid-cols-2 gap-4">
          <p>Reward</p>
          <p>Probabilities</p>
          {rewards.prizes.map((reward, i) => {
            const prizeFormatted = reward.prize_amount.toLocaleString("id-ID");
            return (
              <React.Fragment key={i}>
                <div className="w-fit" key={i + "amount"}>
                  {prizeFormatted} IDR
                </div>
                <div key={i + "chance"}>
                  {reward.prize_weight / TOTAL_PRIZE_WEIGHT_PERCENTAGE}%
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
