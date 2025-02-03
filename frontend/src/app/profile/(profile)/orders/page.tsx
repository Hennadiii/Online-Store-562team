import ProfileOrderItem from "@/components/profile/orderItem";
import ProfileSidebar from "@/components/profile/sidebar";
import CatalogItem from "@/components/shared/catalogItem";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { Button } from "@/components/ui/button";

const MyOrders = () => {
  return (
    <section className="bg-first mx-auto h-full max-w-[1440px] overflow-x-hidden px-80px pb-[32px]">
      <Header />

      <nav className="mx-auto mt-[64px] flex items-center justify-center">
        <ul className="flex items-center gap-x-3">
          {["Дані облікового запису", "/", "Мої замовлення"].map((item) => (
            <li key={item}>
              <a>{item}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex gap-x-[240px] mt-9">
        <ProfileSidebar />

        <section>
          <h2 className="text-[24px] leading-[120%]">Усі замовлення</h2>

          <div className="mt-8 flex flex-col gap-y-8">
            <ProfileOrderItem />
            <ProfileOrderItem />
          </div>
        </section>
      </div>

      <h3 className="text-h2 leading-[120%] uppercase mt-[104px] text-center">
        Вам може сподобатись
      </h3>

      <section className="mt-12 grid grid-cols-2 gap-8">
        <CatalogItem title="Крісло Софт" image="/krislo.png" price="4 500" />
        <CatalogItem title="Крісло Софт" image="/krislo.png" price="4 500" />
        <CatalogItem title="Крісло Софт" image="/krislo.png" price="4 500" />
        <CatalogItem title="Крісло Софт" image="/krislo.png" price="4 500" />
      </section>

      <Button className="w-[622px] border-black mx-auto mt-[50px]">
        Каталог
      </Button>

      <Footer />
    </section>
  );
};

export default MyOrders;
