import Breadcrumbs from "@/components/shared/breadcrumbs";

export default function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full bg-first">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12 pb-8">
        <Breadcrumbs className="mt-[64px]" />
        {children}
      </div>
    </section>
  );
}
