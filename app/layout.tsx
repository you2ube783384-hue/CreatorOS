import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CreatorOS",
  description: "AI Operating System for Faceless & Short-Form Creators"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
