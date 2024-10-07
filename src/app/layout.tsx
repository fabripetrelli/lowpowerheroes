import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LPH",
  description:
    "Low Power Heroes is a project fpr showing your sub 300hp drift car.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="m-0 p-0 bg-black">{children}</body>
    </html>
  );
}
