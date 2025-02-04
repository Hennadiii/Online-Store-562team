import Breadcrumbs from "@/components/shared/breadcrumbs";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="bg-first mx-auto h-full max-w-[1440px] overflow-hidden px-80px pb-[32px]">
      <Header />

      <Breadcrumbs className="mt-[64px]" />

      {children}

      <Footer />
    </section>
  );
}
