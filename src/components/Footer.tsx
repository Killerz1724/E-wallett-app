import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="w-full mb-5">
      <p className="text-gray-400 opacity-50 text-center font-semibold">
        &copy; {year} Tejofolio
      </p>
    </div>
  );
}
