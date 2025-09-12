import Image from "next/image";
import React, { Suspense } from "react";

export default function Logo({
  variant = "orange",
  height = 100,
  width = 200,
}: {
  variant?: "orange" | "white" | "orangeIcon" | "whiteIcon";
  height?: number;
  width?: number;
}) {
  const variantImg = {
    orange: "/TejoflowLogo-Orange.png",
    white: "/TejoflowLogo-White.jpg",
    orangeIcon: "/LogoIconOnly-Orange.png",
    whiteIcon: "/LogoIconOnly-White.png",
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
