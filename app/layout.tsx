import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LeadReply — Reply to new leads instantly",
  description:
    "Paste a lead message and get a ready-to-send, human-sounding reply in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
