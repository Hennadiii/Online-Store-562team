import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import ScrollToTop from "@/components/shared/scrollTop";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
import { AuthProvider } from "@/context/AuthContext";
import { AddressProvider } from "@/context/AddressContext";

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
      <body className={`${MontserratSans.className} antialiased min-h-screen flex flex-col`}>
      <AuthProvider>
  <AddressProvider>
    <FavoritesProvider>
      <CartProvider>
        <OrderProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <ScrollToTop />
        </OrderProvider>
      </CartProvider>
    </FavoritesProvider>
  </AddressProvider>
</AuthProvider>
      </body>
    </html>
  );
}