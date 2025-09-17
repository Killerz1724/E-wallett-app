import AppProvider from "components/AppProvider";
import Modal from "components/Modal";
import QueryProviders from "components/QueryProviders";
import ThemeProviderClient from "components/ThemeProviderClient";
import ToastProvider from "components/ToastProvider";
import type { Metadata, Viewport } from "next";
import React from "react";
import "./globals.css";
import MoreSliderModal from "components/layouts/MoreSliderModal";

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: {
    default: "Tejoflow",
    template: "%s | Tejoflow",
  },
  description: "Solution for seamless wallet",
  openGraph: {
    title: "Tejoflow",
    description: "Solution for seamless wallet",
    siteName: "Tejoflow",
    images: [
      {
        url: "/TejoflowLogo-Orange.png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: "/LogoIconOnly-Orange.png",
};

// eslint-disable-next-line react-refresh/only-export-components
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // prevent pinch-zoom
  themeColor: "#ffffff", // sets mobile browser toolbar color
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProviderClient>
          <QueryProviders>
            <AppProvider>
              {children}
              <Modal />
              <MoreSliderModal />
            </AppProvider>
          </QueryProviders>
          <ToastProvider />
        </ThemeProviderClient>
      </body>
    </html>
  );
}
