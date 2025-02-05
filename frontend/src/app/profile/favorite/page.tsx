import FavoriteItem from "@/components/profile/favoriteItem";
import ProfileSidebar from "@/components/profile/sidebar";
import AnimatedSection from "@/components/shared/animatedSection";

export const metadata = {
  title: "Cozy Corners | Обране",
  description: "Офіційна сторінка обране нашого сайту.",
};

const MyOrders = () => {
  return (
    <AnimatedSection>
      <div className="flex gap-x-[240px] mt-9">
        <ProfileSidebar />

        <section>
          <h2 className="text-[24px] leading-[120%]">Обране</h2>

          <div className="mt-8 grid grid-cols-2 gap-8">
            <FavoriteItem
              image="/divan.png"
              title="Космо Делюкс"
              price="10 250"
            />
            <FavoriteItem
              image="/divan.png"
              title="Космо Делюкс"
              price="10 250"
            />
            <FavoriteItem
              image="/divan.png"
              title="Космо Делюкс"
              price="10 250"
            />
            <FavoriteItem
              image="/divan.png"
              title="Космо Делюкс"
              price="10 250"
            />
          </div>
        </section>
      </div>
    </AnimatedSection>
  );
};

export default MyOrders;
