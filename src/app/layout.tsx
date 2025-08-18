import QueryProviders from "components/QueryProviders";
import ToastProvider from "components/ToastProvider";
import React from "react";
import "./globals.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProviders>{children}</QueryProviders>
        <ToastProvider />
      </body>
    </html>
  );
}
