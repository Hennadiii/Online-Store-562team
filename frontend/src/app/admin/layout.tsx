import type { Metadata } from "next";
import "@/styles/globals.css";
import AdminSidebar from "@/components/shared/adminSidebar";
import AdminTopbar from "@/components/shared/adminTopbar";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Cozy Corners магазин меблів",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex items-center justify-between pl-[267px]">
      <AdminSidebar />
      <section className="flex flex-col w-full">
        <AdminTopbar />
        <div className="bg-[#f5f6fa] h-[calc(100%-70px)] pl-[40px] pt-[70px] pr-6">
          {children}
        </div>
      </section>
    </main>
  );
}
