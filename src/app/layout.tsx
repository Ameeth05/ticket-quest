import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { NuqsAdapter } from "nuqs/adapters/next/app";
// import Script from "next/script";
// import Script from "next/script";
import Header from "@/app/_navigation/header";
import Sidebar from "@/app/_navigation/sidebar/components/sidebar";
import RedirectToast from "@/components/redirect-toast";
import ThemeProvider from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "./_providers/react-query/react-query-provider";

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
        <NuqsAdapter>
          <ThemeProvider>
            <ReactQueryProvider>
              <Header />
              <div className="flex h-screen overflow-hidden border-collapse">
                <Sidebar />
                <main className="py-24 px-8 min-h-screen flex-1 overflow-y-auto overflow-x-hidden bg-secondary/20 flex flex-col">
                  {children}
                </main>
              </div>
              <Toaster expand />
              <RedirectToast />
            </ReactQueryProvider>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
