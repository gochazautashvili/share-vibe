import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Providers from "./providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Share Vibe",
  description:
    "This is share website you can share your story images or videos like instagram and facebook",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <SessionProvider>
          <Providers>
            {children}
            <ToastContainer />
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
