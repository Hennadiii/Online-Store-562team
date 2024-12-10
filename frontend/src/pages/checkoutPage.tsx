import { motion } from 'framer-motion';
import Header from '../components/shared/header';
import CheckoutItem from '../components/shared/checkoutItem';
import { Button } from '../components/ui/button';

const CheckoutPage = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-first mx-auto h-full max-w-[1440px] px-80px pb-[32px]"
    >
      <Header />
      <h1 className="mt-[64px] text-center text-[64px] uppercase leading-[120%]">
        Оформлення замовлення
      </h1>

      <ul className="mt-6 flex items-center justify-center gap-x-3">
        {['Корзина', '/', 'Оформлення замовлення'].map((item) => (
          <li key={item}>
            <a>{item}</a>
          </li>
        ))}
      </ul>

      <div className="flex gap-x-[111px]">
        <div className="mt-12 w-full max-w-[622px]">
          <h2 className="text-[24px] leading-[120%]">Контактна інформація</h2>

          <form className="mt-6 flex w-full flex-col gap-y-[34px]">
            <div className="flex w-full flex-col gap-y-[7px]">
              <label className="text-[12px] leading-[120%] text-accent">
                Прізвище
              </label>
              <input
                className="h-[43px] w-full border-b-[1px] px-2 py-3"
                placeholder="Введіть ваше прізвище"
              />
            </div>
            <div className="flex w-full flex-col gap-y-[7px]">
              <label className="text-[12px] leading-[120%] text-accent">
                Імʼя
              </label>
              <input
                className="h-[43px] w-full border-b-[1px] px-2 py-3"
                placeholder="Введіть ваше імʼя"
              />
            </div>
            <div className="flex w-full flex-col gap-y-[7px]">
              <label className="text-[12px] leading-[120%] text-accent">
                Телефон
              </label>
              <input
                className="h-[43px] w-full border-b-[1px] px-2 py-3"
                placeholder="+ 380 (__) ___ __ __"
              />
            </div>
            <div className="flex w-full flex-col gap-y-[7px]">
              <label className="text-[12px] leading-[120%] text-accent">
                Email
              </label>
              <input
                className="h-[43px] w-full border-b-[1px] px-2 py-3"
                placeholder="Введіть ваш email"
              />
            </div>
          </form>

          {/* information about delivery */}
          <div className="mt-[64px]">
            <h3 className="block text-[24px] leading-[120%]">
              Інформація про доставку
            </h3>
            <div className="mt-6 flex items-center justify-between gap-x-2">
              <div className="flex items-center gap-x-3">
                <input id="pickup" type="checkbox" className="h-6 w-6" />
                <label htmlFor="pickup" className="text-[20px] leading-[120%]">
                  Самовивіз з магазину
                </label>
              </div>
              <div className="mr-20 flex items-center gap-x-3">
                <input id="courier" type="checkbox" className="h-6 w-6" />
                <label htmlFor="courier" className="text-[20px] leading-[120%]">
                  Курʼєрська доставка
                </label>
              </div>
            </div>
            <p className="mt-5 text-accent">
              Магазин працює ПН - НД: 09:00-20:00
            </p>
          </div>

          {/* payment */}
          <div className="mt-[64px] flex flex-col gap-y-6">
            <span className="text-[24px] leading-[120%]">Оплата</span>
            <p className="text-[20px] leading-[120%]">Оплата при отриманні</p>
            <p className="text-accent">
              Оплата здійснюється готівкою або картою.
            </p>
          </div>

          <Button className="mt-14 border-black">зберегти</Button>
        </div>
        <div className="mt-11 h-[608px] w-full max-w-[547px]">
          <div className="flex justify-between">
            <span className="block text-[24px]">Ваше замовлення</span>
            <div className="flex items-center gap-x-2">
              <img src="edit.svg" alt="edit" />
              <span className="text-accent underline">Ред.</span>
            </div>
          </div>
          {/* products */}
          <div className="mt-8 flex flex-col gap-y-8">
            <CheckoutItem />
            <CheckoutItem />
          </div>

          <div className="mt-8 flex justify-between">
            <span>Підсумок</span>
            <span>11 600 ₴</span>
          </div>
          <div className="flex justify-between">
            <span>Доставка</span>
            <span>0 ₴</span>
          </div>
          <div className="mt-5 flex justify-between">
            <span className="text-[24px]">Разом</span>
            <span className="text-[20px] font-semibold">11 600 ₴</span>
          </div>

          <Button variant="black" className="mt-9 w-full truncate">
            ОФОРМИТИ замовлення
          </Button>
        </div>
      </div>
    </motion.section>
  );
};

export default CheckoutPage;
