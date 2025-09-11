import Image from "next/image";
import { Suspense } from "react";
import LoginForm from "./components/LoginForm";
import Link from "next/link";
import Logo from "components/Logo";
import MarkString from "app/about/components/MarkString";
import { APP_NAME } from "constant/common";
import { Metadata } from "next";

export interface loginDataType {
  email: string;
  password: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: "Login",
  description: "Solution for seamless wallet",
};

const Login = () => {
  return (
    <div className="flex flex-col gap-[50px]  lg:gap-[103px] px-4 py-6 h-screen">
      <Logo />
      <div className=" flex flex-col gap-4 lg:flex-row relative items-center justify-around w-full">
        <div className="hidden lg:flex flex-col gap-9">
          <div>
            <h2 className="font-bold text-3xl">Sign in to</h2>
            <MarkString>{APP_NAME}</MarkString>
          </div>
          <div>
            <p>If you don’t have an account register</p>
            <p>
              You can{" "}
              <span className="hover:cursor-pointer underline">
                <Link href="/register">Register here !</Link>
              </span>
            </p>
          </div>
        </div>
        <div className="hidden lg:block lg:absolute -z-10 left-[35%]">
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
        <div className="flex flex-col gap-[47px]">
          <div className="flex flex-col gap-[17px]">
            <h3 className="text-orange-400 font-bold text-3xl">Sign In</h3>
          </div>
          <LoginForm />
          <div className="lg:hidden w-full">
            <p>If you don’t have an account register</p>
            <p>
              You can{" "}
              <span className="hover:cursor-pointer underline">
                <Link href="/register">Register here !</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
