import type { Metadata } from "next";
import "@/styles/global.scss";
import { inter, kanit } from "@/styles/fonts";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import styles from "@/styles/pages/page.module.scss";

export const metadata: Metadata = {
  title: {
    template: "%s | Weather App",
    default: "Weather App",
  },
  description: "Check weather in your favorite cities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${kanit.variable}`}>
        <ReactQueryProvider>
          <Header />
          <main className={`${styles.main} container`}>{children}</main>
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
