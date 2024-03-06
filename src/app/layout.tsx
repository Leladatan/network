import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {NextFont} from "next/dist/compiled/@next/font";
import {Toaster} from "@/components/ui/toaster";
import AuthProvider from "@/providers/auth/auth-provider";
import {getServerSession} from "next-auth";
import ThemesProvider from "@/providers/theme/theme-provider";
import ModalProvider from "@/providers/modal/modal-provider";
import SupabaseProvider from "@/providers/supabase/supabase-provider";
import {authOptions} from "@/utils/constants/auth";
import {SocketProvider} from "@/providers/socket/socket-provider";
import QueryProvider from "@/providers/query/query-provider";

const inter: NextFont = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sociality",
  description: "Sociality desc",
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider session={session}>
          <SocketProvider>
            <QueryProvider>
              <SupabaseProvider>
                <ThemesProvider>
                  <ModalProvider />
                  <Toaster />
                  {children}
                </ThemesProvider>
              </SupabaseProvider>
            </QueryProvider>
          </SocketProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
