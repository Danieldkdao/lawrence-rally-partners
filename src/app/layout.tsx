import type { Metadata } from "next";
import { Outfit, Fraunces } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const frauncesHeading = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
});

const outfitSans = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lawrence Rally Partners",
  description: "Lawrence Rally Partners",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        outfitSans.variable,
        outfitSans.className,
        "font-sans",
        frauncesHeading.variable,
      )}
    >
      <body className="min-h-full flex flex-col dark">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
