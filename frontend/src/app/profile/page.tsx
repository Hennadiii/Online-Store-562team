import ProfileOrderItem from "@/components/profile/orderItem";
import ProfileSidebar from "@/components/profile/sidebar";
import AnimatedSection from "@/components/shared/animatedSection";
import CatalogItem from "@/components/shared/catalogItem";
import { Button } from "@/components/ui/button";

const MyOrders = () => {
  return (
    <AnimatedSection>
      <section className="flex gap-x-[240px] mt-9">
        <ProfileSidebar />
        <div>
          <h2 className="text-[24px] leading-[120%]">Усі замовлення</h2>

          <div className="mt-8 flex flex-col gap-y-8">
            <ProfileOrderItem />
            <ProfileOrderItem />
          </div>
        </div>
      </section>

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
    </AnimatedSection>
  );
};

export default MyOrders;
