import ProfileSidebar from "@/components/profile/sidebar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const OrderDeatilPage = () => {
  return (
    <section>
      <div className="flex gap-x-[240px] mt-9">
        <ProfileSidebar />

        <section>
          <h2 className="text-[24px] leading-[120%]">№ 1203322123</h2>

          <p className="mt-8 font-bold leading-[120%]">
            Замовленно:22 листопада 2024 р, 12:12:44
          </p>

          <div className="h-[34px] mt-3 p-[10px] w-[82px] bg-[#b0debc] flex items-center center justify-between">
            <span className="text-[12px] block text-[#076d21] leading-[120%]">
              Отримано
            </span>
          </div>

          <div className="mt-7 flex gap-[26px]">
            {/* process bar */}
            <div className="mt-1 h-[282px] w-[3px] bg-accent relative">
              <div className="mt-[0px] w-4 h-4 absolute -right-[7px] rounded-[50%] bg-accent"></div>
              <div className="mt-[50px] w-4 h-4 -right-[7px] absolute rounded-[50%] bg-accent"></div>
              <div className="mt-[105px] w-4 h-4 -right-[7px] absolute rounded-[50%] bg-accent"></div>
              <div className="mt-[163px] w-4 h-4 -right-[7px] absolute rounded-[50%] bg-accent"></div>
              <div className="mt-[213px] w-4 h-4 -right-[7px] absolute rounded-[50%] bg-accent"></div>
              <div className="mt-[267px] w-4 h-4 -right-[7px] absolute rounded-[50%] bg-accent"></div>
            </div>

            <ul className="flex flex-col gap-y-[15px]">
              <li>
                <span className="font-semibold leading-[120%]">
                  Нове замовлення
                </span>
                <p className="text-[12px] leading-[120%] text-grey">
                  пт, 22 лист 2024р, 13:10
                </p>
              </li>
              <li>
                <span className="font-semibold leading-[120%]">
                  Замовлення прийнято
                </span>
                <p className="text-[12px] leading-[120%] text-grey">
                  пт, 22 лист 2024р, 13:10
                </p>
              </li>
              <li>
                <span className="font-semibold leading-[120%]">
                  У процесі комплектації
                </span>
                <p className="text-[12px] leading-[120%] text-grey">
                  пт, 22 лист 2024р, 13:10
                </p>
              </li>
              <li>
                <span className="font-semibold leading-[120%]">
                  Готове до відправки
                </span>
                <p className="text-[12px] leading-[120%] text-grey">
                  пт, 22 лист 2024р, 13:10
                </p>
              </li>
              <li>
                <span className="font-semibold leading-[120%]">
                  Відправлено
                </span>
                <p className="text-[12px] leading-[120%] text-grey">
                  пт, 22 лист 2024р, 13:10
                </p>
              </li>
              <li>
                <span className="font-semibold leading-[120%]">Отримано</span>
                <p className="text-[12px] leading-[120%] text-grey">
                  пт, 22 лист 2024р, 13:10
                </p>
              </li>
            </ul>
          </div>

          <h4 className="leading-[120%] font-semibold mt-8">2 товари</h4>
          <div className="mt-3 flex gap-x-[14px]">
            <Image width={150} height={150} src="/krislo.png" alt="item" />
            <Image width={150} height={150} src="/krislo.png" alt="item" />
          </div>

          <div className="mt-[105px] flex justify-between w-[630px]">
            <div className="flex items-center justify-between border-[#d9d9d9] border w-[70px] h-12 rounded-[6px]">
              <Image
                className="ml-[9px]"
                width={49}
                height={16}
                src="/visa.svg"
                alt="visa"
              />
            </div>

            <div className="w-[210px] text-[12px] flex flex-col gap-y-7">
              <div className="flex justify-between">
                <span>Ціна</span>
                <p>3000 ₴</p>
              </div>
              <div className="flex justify-between">
                <p className="max-w-[115px] leading-[120%]">
                  Отримання за адресою Київ, вул. Святошинська 8/95/10 0 ₴
                </p>
                <span>0 ₴</span>
              </div>
              <div className="flex justify-between">
                <span>Загальна сума</span>
                <span>3000 ₴</span>
              </div>
            </div>
          </div>

          <p className="font-semibold mt-[90px]">
            Отримання кур’єрською доставкою - Оплата при отриманні
          </p>

          <div className="mt-7 flex flex-col gap-y-3">
            <div className="flex gap-x-3 justify-between">
              <span>Адреса пункту отримання</span>
              <span>Дані для отримання</span>
            </div>
            <div className="flex gap-x-3 justify-between">
              <span>м.Київ, вул. Святошинська 8/95/10</span>
              <span className="pr-5">
                Марина Зоріна <br /> +380 (33) 219 00 33
              </span>
            </div>
          </div>

          <Button className="w-full border-black mt-9">Купити Повторно</Button>
        </section>
      </div>
    </section>
  );
};

export default OrderDeatilPage;
