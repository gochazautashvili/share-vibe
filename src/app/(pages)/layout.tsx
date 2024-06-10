import Header from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="f-full max-w-[1400px] px-3 md:px-4 lg:px-2 mx-auto py-16">
        {children}
      </main>
    </>
  );
}
