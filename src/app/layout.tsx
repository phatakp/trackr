import { Navbar } from "@/components/navigation/navbar";
import AppProvider from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <AppProvider>
        <body
          className={cn(
            "min-h-screen bg-background font-sans font-medium antialiased",
            fontSans.variable
          )}
        >
          <div className="grid grid-rows-[auto,1fr]">
            <Navbar />
            <main className="container md:p-4">{children}</main>
            <Toaster richColors />
          </div>
        </body>
      </AppProvider>
    </html>
  );
}
