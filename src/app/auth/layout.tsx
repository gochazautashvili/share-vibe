import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Share Vibe Auth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
