import Image from "next/image";
import { Suspense } from "react";
import RegisterForm from "./components/RegisterForm";
import Link from "next/link";
import Logo from "components/Logo";
import MarkString from "app/about/components/MarkString";
import { APP_NAME } from "constant/common";

export interface loginDataType {
  email: string;
  password: string;
}

const Login = () => {
  return (
    <div className="flex flex-col gap-[50px]  lg:gap-[103px]  px-4 py-6 h-screen">
      <Logo />
      <div className=" flex relative items-center justify-around w-full">
        <div className="hidden lg:flex flex-col gap-9">
          <div>
            <h2 className="font-bold text-3xl">Sign up to</h2>
            <MarkString>{APP_NAME}</MarkString>
          </div>
          <div>
            <p>If you already have an account</p>
            <p>
              You can{" "}
              <span className="hover:cursor-pointer underline">
                <Link href="/login">Login here !</Link>
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[32px]">
          <RegisterForm />
          <div className="w-full">
            <p>If you already have an account</p>
            <p>
              You can{" "}
              <span className="hover:cursor-pointer underline">
                <Link href="/login">Login here !</Link>
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
      </div>
    </div>
  );
};

export default Login;
