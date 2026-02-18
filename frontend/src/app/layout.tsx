import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/styles/globals.css";

import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import ScrollToTop from "@/components/shared/scrollTop";

const MontserratSans = Montserrat({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
});

export const metadata: Metadata = {
  title: "Cozy Corners",
  description: "Cozy Corners магазин меблів",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body
        className={`${MontserratSans.className} antialiased min-h-screen flex flex-col`}
      >
        {/* Header всегда сверху */}
        <Header />

        {/* Контент растягивается */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer всегда внизу */}
        <Footer />

        <ScrollToTop />
      </body>
    </html>
  );
}
