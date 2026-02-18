import Breadcrumbs from "@/components/shared/breadcrumbs";


export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="bg-first mx-auto h-full max-w-[1440px] overflow-hidden px-80px pb-[32px]">
      

      <Breadcrumbs className="mt-[64px]" />

      {children}

      
    </section>
  );
}
