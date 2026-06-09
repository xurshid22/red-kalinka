import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Red Kalinka — Russian A1",
  description: "Interactive Russian language learning app based on Red Kalinka A1 textbook",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">{children}</body>
    </html>
  );
}
