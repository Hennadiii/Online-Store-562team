import ProfileOrderItem from "@/components/profile/orderItem";
import ProfileSidebar from "@/components/profile/sidebar";
import CatalogItem from "@/components/shared/catalogItem";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SettingsPage = () => {
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
          <h2 className="text-[24px] leading-[120%]">
            Дані облікового запису{" "}
          </h2>

          <form className="mt-10 w-[662px] flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-2 h-[62px]">
              <label className="text-[12px] leading-[120%] text-accent">
                Прізвище
              </label>
              <input
                className="h-[41px] w-full p-2 border-b border-black"
                placeholder="Зоріна"
              />
            </div>
            <div className="flex flex-col gap-y-2 h-[62px]">
              <label className="text-[12px] leading-[120%] text-accent">
                Прізвище
              </label>
              <input
                className="h-[41px] w-full p-2 border-b border-black"
                placeholder="Марина"
              />
            </div>
            <div className="flex flex-col gap-y-2 h-[62px]">
              <label className="text-[12px] leading-[120%] text-accent">
                Прізвище
              </label>
              <input
                className="h-[41px] w-full p-2 border-b border-black"
                placeholder="+380 (33) 219 00 33"
              />
            </div>
            <div className="flex flex-col gap-y-2 h-[62px]">
              <label className="text-[12px] leading-[120%] text-accent">
                Прізвище
              </label>
              <input
                className="h-[41px] w-full p-2 border-b border-black"
                placeholder="marinzor@gmail.com"
              />
            </div>

            <span className="text-[24px] leading-[120%] block my-4">
              Пароль
            </span>

            <div className="flex flex-col gap-y-2 h-[62px]">
              <label className="text-[12px] leading-[120%] text-accent">
                Прізвище
              </label>
              <input
                className="h-[41px] w-full p-2 border-b border-black"
                placeholder="Старий пароль"
                type="password"
              />
            </div>
            <div className="flex flex-col gap-y-2 h-[62px]">
              <label className="text-[12px] leading-[120%] text-accent">
                Прізвище
              </label>
              <input
                className="h-[41px] w-full p-2 border-b border-black"
                placeholder="Новий пароль"
                type="password"
              />
            </div>
            <div className="flex flex-col gap-y-2 h-[62px]">
              <label className="text-[12px] leading-[120%] text-accent">
                Прізвище
              </label>
              <input
                className="h-[41px] w-full p-2 border-b border-black"
                placeholder="Підтвердіть новий пароль"
                type="password"
              />
            </div>

            <Button className="border-black mt-4">зберегти</Button>
          </form>
        </section>
      </div>
      <Footer />
    </section>
  );
};

export default SettingsPage;
