import DashboardLayout from "components/DashboardLayout";
import Logo from "components/Logo";
import Link from "next/link";
import MarkString from "./components/MarkString";

export default function AboutPage() {
  return (
    <DashboardLayout>
      <section className="space-y-12 max-w-3xl">
        <div className="space-y-4">
          <Logo />
          <p className="text-lg text-justify">
            <MarkString>Tejoflow</MarkString> is the smart, modern{" "}
            <MarkString>e-wallet</MarkString> designed to keep your{" "}
            <MarkString>finances</MarkString> flowing with ease. Whether you’re
            checking your balance, tracking expenses, or transferring money,{" "}
            <MarkString>Tejoflow</MarkString> gives you full control in one
            sleek app.
          </p>
        </div>
        <div className="space-y-4">
          <h4 className="text-2xl font-semibold">Check out my Portfolio!</h4>
          <ul>
            <li className="text-lg underline text-orange-400 list-disc list-inside">
              <Link href={"https://tejofolio.xyz"} target="_blank">
                Tejofolio
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="text-2xl font-semibold">External sites that i used</h4>
          <ul>
            <li className="text-lg underline text-orange-400 list-disc list-inside">
              <Link href={"https://openexchangerates.org/"} target="_blank">
                Open Exchanges rates
              </Link>
            </li>
            <li className="text-lg underline text-orange-400 list-disc list-inside">
              <Link href={"https://supabase.com/"} target="_blank">
                Supabase
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </DashboardLayout>
  );
}
