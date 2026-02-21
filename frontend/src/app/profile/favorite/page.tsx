"use client";

import FavoriteItem from "@/components/profile/favoriteItem";
import ProfileSidebar from "@/components/profile/sidebar";
import AnimatedSection from "@/components/shared/animatedSection";
import { useFavoritesContext } from "@/context/FavoritesContext";

const FavoritePage = () => {
  const { favorites } = useFavoritesContext();

  return (
    <AnimatedSection>
      <div className="flex gap-x-[240px] mt-9">
        <ProfileSidebar />

        <section>
          <h2 className="text-[24px] leading-[120%]">Обране</h2>

          {favorites.length === 0 ? (
            <p className="mt-8 text-gray-400">Список обраного порожній</p>
          ) : (
            <div className="mt-8 grid grid-cols-2 gap-8">
              {favorites.map((item) => (
                <FavoriteItem
                  key={item.id}
                  image={item.images[0]}
                  title={item.title}
                  price={item.price.toLocaleString("uk-UA")}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </AnimatedSection>
  );
};

export default FavoritePage;