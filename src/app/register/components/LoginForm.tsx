"use client";
import clsxm from "@riverfl0w/clsxm";

import { EyeClosed, EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useLoginPost } from "../hooks/mutation";
import type { loginDataType } from "../page";

export default function LoginForm() {
  const [isHidden, setIsHidden] = useState(true);
  const [data, setData] = useState<loginDataType>({
    email: "",
    password: "",
  });

  const [errors, setIsErrors] = useState<loginDataType>({
    email: "",
    password: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const { mutateAsync: login, isPending } = useLoginPost();
  const route = useRouter();

  function validate(name: string, value: string) {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let error = "";
    if (name === "email") {
      if (!emailRegex.test(value)) {
        error = "Please enter a valid email address";
      }
    }

    if (name === "password") {
      if (value.length <= 5) {
        error = "Password must be at least 6 characters long";
      }
    }

    setIsErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  }
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    validate(name, value);
  }

  useEffect(() => {
    const isNotError = Object.values(errors).every((error) => !error);
    const isAllFilled = Object.values(data).every((data) => data.length > 0);
    setIsFormValid(isNotError && isAllFilled);
  }, [errors, data]);
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    login(data).then(() => {
      route.push("/");
    });
  }
  return (
    <div className="flex flex-col gap-[17px]">
      <h3 className="text-orange-400 font-bold text-3xl">Sign In</h3>
      <form onSubmit={handleSubmit} action="" className="flex flex-col gap-4">
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
            {errors.email && <p className="text-red-400">{errors.email}</p>}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-col justify-between focus-within:outline-2 gap-4 items-center bg-[#F2F2F2] px-6 py-4 rounded-lg">
              <div
                tabIndex={0}
                className="flex justify-between outline-none  w-full"
              >
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
            {errors.password && (
              <p className="text-red-400">{errors.password}</p>
            )}
          </div>
          <p className="cursor-pointer text-orange-400">Forgot Password</p>
        </div>
        <button
          type="submit"
          disabled={!isFormValid || isPending}
          className={clsxm(
            "bg-orange-400 hover:bg-orange-300 py-6 px-[10rem] rounded-lg border-none shadow-2xl hover:cursor-pointer text-white transition-all",
            !isFormValid && "opacity-50 hover:cursor-not-allowed"
          )}
        >
          Login
        </button>
      </form>
    </div>
  );
}
