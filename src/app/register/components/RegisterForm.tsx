"use client";

import Button from "components/Button";
import { EyeClosed, EyeIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { useActionState, useEffect, useState, type ChangeEvent } from "react";
import { toast } from "react-toastify";
import { Register } from "../action/action";
import { registerSchema, registerSchemaType } from "../action/schema";

export default function RegisterForm() {
  const [isHidden, setIsHidden] = useState(true);
  const [state, dispatchRegister] = useActionState(Register, {
    success: false,
    message: "",
  });
  const [data, setData] = useState<registerSchemaType>({
    email: "",
    password: "",
    username: "",
  });

  const [errors, setIsErrors] = useState<
    Partial<Record<keyof registerSchemaType, string>>
  >({});

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const check = registerSchema.safeParse({ ...data, [name]: value });

    if (!check.success) {
      const issue = check.error.issues.find((issue) => issue.path[0] === name);
      setIsErrors((prev) => ({
        ...prev,
        [name]: issue?.message,
      }));
    } else {
      setIsErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  }

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
        redirect("/login");
      }
      {
        toast.error(state.message);
      }
    }
  }, [state.message, state.success]);
  return (
    <div className="flex flex-col gap-[17px]">
      <h3 className="text-orange-400 font-bold text-3xl">Sign Up</h3>
      <form action={dispatchRegister} className="flex flex-col gap-4">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="username">Username</label>
            <input
              value={data.username}
              onChange={handleChange}
              id="username"
              className="flex justify-between items-center bg-[#F2F2F2] px-6 py-4 rounded-lg"
              name="username"
              type="username"
              placeholder="Enter username"
            />
            {errors.username && (
              <p className="text-red-400">{errors.username}</p>
            )}
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="email">Email</label>
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
            <label htmlFor="password">Password</label>
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
        </div>
        <Button
          disabled={!registerSchema.safeParse(data).success}
          type="submit"
        >
          Register
        </Button>
      </form>
    </div>
  );
}
