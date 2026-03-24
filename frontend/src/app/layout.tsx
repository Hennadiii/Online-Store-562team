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
      {/*
        Прибрано min-h-screen з <body>.
        Проблема: min-h-screen робить body "незалежним scroll container"-ом —
        Chrome бачить body.scrollHeight > body.clientHeight і малює
        скролбар на body, а html скролить document. Виходить два скролбари.

        Рішення: body отримує height: 100% через globals.css (тягнеться з html),
        flex flex-col залишається для sticky footer,
        min-h-screen переїздить на <main> щоб footer завжди був внизу.
      */}
      <body className={`${MontserratSans.className} antialiased flex flex-col`}>
        <AuthProvider>
          <AddressProvider>
            <FavoritesProvider>
              <CartProvider>
                <OrderProvider>
                  <Header />
                  <main className="flex-1 min-h-screen">{children}</main>
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