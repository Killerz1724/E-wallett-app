import {
  mdiAppleIos,
  mdiEyeOffOutline,
  mdiEyeOutline,
  mdiFacebook,
  mdiGoogle,
} from "@mdi/js";
import Icon from "@mdi/react";
import clsxm from "@riverfl0w/clsxm";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import personHappy from "../assets/personHappy.svg";

export interface loginDataType {
  email: string;
  password: string;
}

const Login = () => {
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

    console.log(data);
  }

  return (
    <div className="flex flex-col gap-[103px] px-4 py-6 h-screen">
      <div className="text-2xl font-semibold text-orange-400">E Wallet</div>
      <div className=" flex relative items-center justify-around w-full">
        <div className="flex flex-col gap-9">
          <div>
            <h2 className="font-bold text-3xl">Sign in to</h2>
            <h3>E Wallet</h3>
          </div>
          <div>
            <p>If you don’t have an account register</p>
            <p>
              You can{" "}
              <span className="hover:cursor-pointer underline">
                Register here !
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[47px]">
          <div className="flex flex-col gap-[17px]">
            <h3 className="text-orange-400 font-bold text-3xl">Sign In</h3>
            <form
              onSubmit={handleSubmit}
              action=""
              className="flex flex-col gap-4"
            >
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
                  {errors.email && (
                    <p className="text-red-400">{errors.email}</p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex flex-col justify-between focus-within:outline-2 gap-4 items-center bg-[#F2F2F2] px-6 py-4 rounded-lg">
                    <div tabIndex={0} className="flex justify-between  w-full">
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
                        {isHidden ? (
                          <Icon path={mdiEyeOffOutline} size={1} />
                        ) : (
                          <Icon path={mdiEyeOutline} size={1} />
                        )}
                      </span>
                    </div>
                  </div>
                  {errors.password && (
                    <p className="text-red-400">{errors.password}</p>
                  )}
                </div>
                <p className="cursor-pointer text-orange-400">
                  Forgot Password
                </p>
              </div>
              <button
                type="submit"
                disabled={!isFormValid}
                className={clsxm(
                  "bg-orange-400 hover:bg-orange-300 py-6 px-[10rem] rounded-lg border-none shadow-2xl hover:cursor-pointer text-white transition-all",
                  !isFormValid && "opacity-50 hover:cursor-not-allowed"
                )}
              >
                Login
              </button>
            </form>
          </div>
          <div className="flex gap-4">
            <p>or continue wth</p>
            <div className="flex gap-4 items-center justify-center">
              <Icon className="cursor-pointer" path={mdiFacebook} size={1} />
              <Icon className="cursor-pointer" path={mdiAppleIos} size={1} />
              <Icon className="cursor-pointer" path={mdiGoogle} size={1} />
            </div>
          </div>
        </div>
        <div className="absolute -z-10 left-[35%]">
          <img src={personHappy} className="w-full " alt="personHappy icon" />
        </div>
      </div>
    </div>
  );
};

export default Login;
