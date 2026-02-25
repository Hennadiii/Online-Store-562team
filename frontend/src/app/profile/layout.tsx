import Breadcrumbs from "@/components/shared/breadcrumbs";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-first">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Breadcrumbs className="pt-10 mb-8" />
        {children}
      </div>
    </section>
  );
}