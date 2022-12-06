import { Footer } from "./Footer";
import { Header } from "./Header";
import { ReactNode } from "react";
import Head from "next/head";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Online Shop</title>
        <meta name="description" content="Online shop description..."></meta>
      </Head>
      <Header />
      <div className="flex-grow flex h-full justify-center">
        <div className="max-w-5xl w-full pt-2">{children}</div>
      </div>
      <Footer />
    </div>
  );
};
