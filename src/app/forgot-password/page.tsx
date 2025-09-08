"use client";
import { useSearchParams } from "next/navigation";
import RequestResetForm from "./components/RequestResetForm";
import ResetPasswordForm from "./components/ResetPasswordForm";

export default function ForgotPasswordPage() {
  const params = useSearchParams().get("tkn");
  return (
    <main className="w-full px-4 mt-10 flex items-center justify-center">
      {params ? <ResetPasswordForm /> : <RequestResetForm />}
    </main>
  );
}
