import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import { homePath, ticketsPath } from "@/paths";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",

  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Ticket Quest",
  description: "Generate Tickets",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="flex justify-between px-5 py-2.5 border-b w-full bg-background/95 backdrop-blur fixed left-0 right-0 top-0 z-20 supports-backdrop-blur:bg-background/60">
          <div>
            <Link href={homePath()} className="text-lg font-bold">
              Home
            </Link>
          </div>
          <div>
            <Link href={ticketsPath()} className="text-sm underline">
              Tickets
            </Link>
          </div>
        </nav>
        <main className="py-24 px-8 min-h-screen flex-1 overflow-y-auto overflow-x-hidden bg-secondary/20 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
