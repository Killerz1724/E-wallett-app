"use client";

import Button from "components/Button";
import { EyeClosed, EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState, type ChangeEvent } from "react";
import { toast } from "react-toastify";
import { Login } from "../actions/action";
import type { loginDataType } from "../page";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const [isHidden, setIsHidden] = useState(true);

  const [state, dispatchLogin] = useActionState(Login, {
    success: false,
    message: "",
  });
  const [data, setData] = useState<loginDataType>({
    email: "",
    password: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);

        router.push("/");
      } else {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  return (
    <form action={dispatchLogin} className="flex flex-col gap-4">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1 w-full">
          <input
            value={data.email}
            onChange={handleChange}
            id="email"
            className="flex justify-between items-center bg-[#F2F2F2] px-6 py-4 rounded-lg"
            name="email"
            type="email"
            placeholder="Enter email"
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-col justify-between focus-within:outline-2 gap-4 items-center bg-[#F2F2F2] px-6 py-4 rounded-lg">
            <div className="flex justify-between outline-none  w-full">
              <input
                value={data.password}
                onChange={handleChange}
                className="border-none outline-none bg-transparent"
                id="password"
                name="password"
                type={isHidden ? "password" : "text"}
                placeholder="Password"
              />
              <span
                className="cursor-pointer"
                onClick={() => setIsHidden(!isHidden)}
              >
                {isHidden ? <EyeIcon /> : <EyeClosed />}
              </span>
            </div>
          </div>
        </div>
        <Link
          href="/forgot-password"
          className="cursor-pointer text-orange-400"
        >
          Forgot Password
        </Link>
      </div>
      <Button type="submit">Login</Button>
    </form>
  );
}
