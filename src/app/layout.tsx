import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Umang Public School",
  description: "School website with events, notices, gallery, and contact forms."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
