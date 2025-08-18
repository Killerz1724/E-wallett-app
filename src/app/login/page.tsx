import { mdiAppleIos, mdiFacebook, mdiGoogle } from "@mdi/js";
import Icon from "@mdi/react";
import LoginForm from "./components/LoginForm";
import Image from "next/image";
import { Suspense } from "react";

export interface loginDataType {
  email: string;
  password: string;
}

const Login = () => {
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
          <LoginForm />
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
          <Suspense fallback={<p>Loading..</p>}>
            <Image
              src={"/personHappy.svg"}
              alt="personHappy icon"
              width={200}
              height={200}
              priority
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Login;
