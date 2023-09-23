import "./globals.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "todo",
  description: "todo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
