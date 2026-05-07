import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import THeader from "./components/Header";
import { ModalProvider } from "@/components/ui/animated-modal";
import TClerkWithTheme from "./providers/TClerkProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Multi-tenant Portal",
  description: "A store for clearance items, central payment processing, and shipping.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-gray-50`}
    >
      <body className="min-h-full flex flex-col">
        <TClerkWithTheme>
          <ModalProvider>
            <Toaster
              position="top-right"
              reverseOrder={false}
            />
            <THeader />
            <section className="flex-1 py-6">
              {children}
            </section>
          </ModalProvider>
        </TClerkWithTheme>
      </body>
    </html>
  );
}
