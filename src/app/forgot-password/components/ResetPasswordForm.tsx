import { EyeClosed, EyeIcon, OctagonAlert } from "lucide-react";
import React, { useActionState, useEffect, useState } from "react";
import { resetPasswordSchema, resetPasswordType } from "../action/schema";
import Button from "components/Button";
import { ResetPassword } from "../action/action";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function ResetPasswordForm() {
  const token = useSearchParams().get("tkn");
  const router = useRouter();
  const [state, dispatchReset] = useActionState(ResetPassword, {
    state: false,
    message: "",
  });
  const [data, setData] = useState<resetPasswordType>({
    password: "",
    confirmPassword: "",
    token: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof resetPasswordType, string>>
  >({});
  const [isHidden, setIsHidden] = React.useState({
    password: true,
    confirmPassword: true,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const check = resetPasswordSchema.safeParse({ ...data, [name]: value });

    if (!check.success) {
      const issue = check.error.issues.find((iss) => iss.path[0] === name);

      setErrors((prev) => ({
        ...prev,
        [name]: issue?.message,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  }

  useEffect(() => {
    if (state.message) {
      if (state.state) {
        toast.success(state.message);
        router.replace("/login");
      } else {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  return (
    <div className="max-w-md w-full flex flex-col items-center gap-10">
      <OctagonAlert size={100} className="text-orange-400" />
      <div className="space-y-2 ">
        <h2 className="font-bold text-2xl text-center">Forgot Password</h2>
        <p className="text-gray-500 text-sm text-center">
          Enter your new password
        </p>
      </div>
      <form
        action={(data) => dispatchReset(data)}
        className="w-full flex flex-col gap-4"
      >
        <div className="flex flex-col justify-between focus-within:outline-2 gap-4 items-center bg-[#F2F2F2] px-6 py-4 rounded-lg">
          <div className="flex justify-between outline-none  w-full">
            <input
              className="border-none outline-none bg-transparent"
              id="password"
              name="password"
              type={isHidden.password ? "password" : "text"}
              placeholder="Enter your new password"
              onChange={handleChange}
            />
            <span
              className="cursor-pointer"
              onClick={() =>
                setIsHidden((prev) => ({ ...prev, password: !prev.password }))
              }
            >
              {isHidden.password ? <EyeIcon /> : <EyeClosed />}
            </span>
          </div>
        </div>
        {errors.password && <p className="text-red-500">{errors.password}</p>}
        <div className="flex flex-col justify-between focus-within:outline-2 gap-4 items-center bg-[#F2F2F2] px-6 py-4 rounded-lg">
          <div className="flex justify-between outline-none  w-full">
            <input
              className="border-none outline-none bg-transparent w-full"
              id="confirm-password"
              name="confirmPassword"
              type={isHidden.confirmPassword ? "password" : "text"}
              placeholder="Confirm your new password"
              onChange={handleChange}
            />
            <span
              className="cursor-pointer"
              onClick={() =>
                setIsHidden((prev) => ({
                  ...prev,
                  confirmPassword: !prev.confirmPassword,
                }))
              }
            >
              {isHidden.confirmPassword ? <EyeIcon /> : <EyeClosed />}
            </span>
          </div>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword}</p>
        )}
        <div className="space-x-2 w-full">
          <span className="text-gray-300">Token : </span>
          <input
            type="text"
            name="token"
            value={token}
            readOnly
            className="outline-none text-gray-300"
          />
        </div>
        <Button
          disabled={!resetPasswordSchema.safeParse(data).success}
          type="submit"
          className="p-2 text-md font-bold"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
