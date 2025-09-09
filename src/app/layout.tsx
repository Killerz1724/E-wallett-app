import AppProvider from "components/AppProvider";
import QueryProviders from "components/QueryProviders";
import ToastProvider from "components/ToastProvider";
import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import Modal from "components/Modal";

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
    images: "/TejoflowLogo-Orange.png",
    locale: "en_US",
    type: "website",
  },
  icons: "/LogoIconOnly-Orange.png",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProviders>
          <AppProvider>
            {children}
            <Modal />
          </AppProvider>
        </QueryProviders>
        <ToastProvider />
      </body>
    </html>
  );
}
