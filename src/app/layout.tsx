import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";

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
        "scroll-smooth",
        "antialiased",
        outfitSans.variable,
        outfitSans.className,
        "font-sans",
        frauncesHeading.variable,
      )}
    >
      <body className="min-h-screen dark">
        <div className="relative isolate min-h-screen w-full">
          <Header />
          {children}
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
