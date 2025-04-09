import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
// import Script from "next/script";
// import Script from "next/script";
import Header from "@/components/header";
import RedirectToast from "@/components/redirect-toast";
import ThemeProvider from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";

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

// root layout doesn't automatically render when a user navigates between pages

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  
  return (
    <html suppressHydrationWarning lang="en">
      {/* <head>
        <Script
          src="//unpkg.com/react-scan/dist/auto.global.js"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </head> */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Header />
          <main className="py-24 px-8 min-h-screen flex-1 overflow-y-auto overflow-x-hidden bg-secondary/20 flex flex-col">
            {children}
          </main>
          <Toaster expand />
          <RedirectToast />
        </ThemeProvider>
      </body>
    </html>
  );
}
