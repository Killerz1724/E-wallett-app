"use client";

import SelectServer from "components/ui/SelectServer";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { useUserListGet } from "./hooks/mutation";
import { useDebounce } from "hooks/useDebounce";

type UserOptions = {
  value: number;
  label: string;
  img_url: string;
};

export default function SelectRecipient() {
  const { mutateAsync: getUsers, data, isPending, isError } = useUserListGet();
  const [recipient, setRecipient] = useState("");

  const debounceVal = useDebounce(recipient, 500);
  function handleChange(newValue: string) {
    setRecipient(newValue);
  }

  useEffect(() => {
    if (debounceVal.length > 2) {
      getUsers(debounceVal);
    }
  }, [debounceVal, getUsers]);

  const formatOption = (options: UserOptions) => {
    return (
      <div className="flex items-center gap-2">
        <Suspense fallback={""}>
          <Image
            src={options.img_url ? options.img_url : "/dummy-profile.jpg"}
            alt={`${options.label} profile icon`}
            width={20}
            height={20}
            className="rounded-full"
          />
        </Suspense>
        <span>{options.label}</span>
      </div>
    );
  };

  const dataAsOption =
    data &&
    data.users.map((user) => {
      return {
        value: user.wallet_id,
        label: user.username,
        img_url: user.img_url,
      };
    });
  return (
    <SelectServer
      options={dataAsOption}
      placeholder="Type username..."
      isPending={isPending}
      isError={isError}
      onInputChange={handleChange}
      formatOptionLabel={formatOption}
    />
  );
}
