"use client";

import SelectServer from "components/ui/SelectServer";
import { useDebounce } from "hooks/useDebounce";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { Props } from "react-select";
import { useUserListGet } from "./hooks/mutation";

export type UserOptions = {
  value: number;
  label: string;
  img_url: string;
};

export default function SelectRecipient({ ...props }: Omit<Props, "options">) {
  const { mutateAsync: getUsers, data, isPending, isError } = useUserListGet();
  const [recipient, setRecipient] = useState("");

  const debounceVal = useDebounce(recipient, 500);
  function handleSearch(newValue: string) {
    setRecipient(newValue);
  }

  useEffect(() => {
    if (debounceVal.length > 2) {
      getUsers(debounceVal);
    }
  }, [debounceVal, getUsers]);

  const formatOption = (options: UserOptions) => {
    return (
      <div className="flex items-center gap-2 ">
        <div className="relative w-8 h-8">
          <Suspense fallback={""}>
            <Image
              src={options.img_url ? options.img_url : "/dummy-profile.jpg"}
              alt={`${options.label} profile icon`}
              fill
              className="rounded-full object-cover"
            />
          </Suspense>
        </div>
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
      value={recipient}
      placeholder="Type username..."
      isPending={isPending}
      isError={isError}
      onInputChange={handleSearch}
      formatOptionLabel={formatOption}
      {...props}
    />
  );
}
