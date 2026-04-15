import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import QueryProviders from '@/providers/QueryProvider';
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const roboto = Roboto({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Do.Quest",
  description: "Do quest app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={roboto.className}
      >
        <QueryProviders>
          {children}
          <Toaster position="top-right" richColors />
        </QueryProviders>
      </body>
    </html>
  );
}
