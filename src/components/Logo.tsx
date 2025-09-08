import Image from "next/image";
import React, { Suspense } from "react";

export default function Logo({
  variant = "orange",
  height = 100,
  width = 200,
}: {
  variant?: "orange" | "white";
  height?: number;
  width?: number;
}) {
  const variantImg = {
    orange: "/tejoflowLogo-Orange.png",
    white: "/tejoflowLogo-White.png",
  };
  return (
    <Suspense fallback={<p>Loading..</p>}>
      <Image
        src={variantImg[variant]}
        alt="tejoflowLogo-Orange"
        width={width}
        height={height}
      />
    </Suspense>
  );
}
