"use client";
import React, { ChangeEvent, useActionState, useEffect, useState } from "react";
import { reqResetSchema, reqResetType } from "../action/schema";
import { RequestReset } from "../action/action";
import { useRouter } from "next/navigation";
import { OctagonAlert } from "lucide-react";
import Button from "components/Button";

export default function RequestResetForm() {
  const [state, dispatchRequest] = useActionState(RequestReset, {
    token: "",
  });
  const [data, setData] = useState<reqResetType>({ email: "" });
  const [error, setError] = useState<
    Partial<Record<keyof reqResetType, string>>
  >({});

  const route = useRouter();
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const check = reqResetSchema.safeParse({ ...data, [name]: value });

    if (!check.success) {
      const issue = check.error.issues.find((iss) => iss.path[0] === name);

      setError((prev) => ({
        ...prev,
        [name]: issue?.message,
      }));
    } else {
      setError((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  }

  useEffect(() => {
    if (state.token) {
      route.replace(`/forgot-password?tkn=${state.token}`);
    }
  }, [state, route]);
  return (
    <div className="max-w-md w-full flex flex-col items-center gap-10">
      <OctagonAlert size={100} className="text-orange-400" />
      <div className="space-y-2 ">
        <h2 className="font-bold text-2xl text-center">Forgot Password</h2>
        <p className="text-gray-500 text-sm text-center">
          Enter your email to reset your password and we will send you the link
          to your email.{" "}
        </p>
        <strong className="text-xs">
          Note: but for this demo we will not send you the link instead we will
          direct you to the reset password page
        </strong>
      </div>
      <form action={dispatchRequest} className="w-full flex flex-col gap-4">
        <div className="flex flex-col justify-between focus-within:outline-2 gap-4 items-center bg-[#F2F2F2] px-6 py-4 rounded-lg">
          <div className="flex justify-between outline-none  w-full">
            <input
              className="border-none outline-none bg-transparent w-full"
              id="email"
              name="email"
              type="text"
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>
        </div>
        {error.email && <p className="text-red-500">{error.email}</p>}
        <Button type="submit" className="p-2 text-md font-bold">
          Send
        </Button>
        <p className="text-gray-400 text-sm">
          if you not redirectly after sending then email is not registered
        </p>
      </form>
    </div>
  );
}
