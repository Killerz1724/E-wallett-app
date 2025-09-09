import Button from "components/Button";
import { Home } from "lucide-react";
import React from "react";

export default function NotFoundPage() {
  return (
    <main className="w-full h-screen flex items-center px-4 justify-center bg-orange-50">
      <section className="flex px-12 py-4 items-center bg-white flex-col rounded-2xl max-w-xl text-center shadow-lg gap-4">
        <h1 className="text-6xl md:text-9xl font-bold text-orange-400 ">404</h1>
        <p className="text-lg md:text-2xl font-semibold">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <p className="md:text-lg text-gray-400">
          It might have been removed, renamed, or did not exist in the first
          place.
        </p>
        <Button className="w-fit flex items-center gap-2 px-4">
          <Home /> Go Home
        </Button>
      </section>
    </main>
  );
}
