import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {NextFont} from "next/dist/compiled/@next/font";
import {Toaster} from "@/components/ui/toaster";
import {SessionProvider} from "next-auth/react";
import AuthProvider from "@/providers/auth/auth-provider";

const inter: NextFont = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sociality",
  description: "Sociality desc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Toaster />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
