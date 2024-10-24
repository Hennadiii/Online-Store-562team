import { Button } from '../components/ui/button';
import Header from '../components/shared/header';
import ProductItem from '../components/shared/productItem';
import Footer from '../components/shared/footer';
import StarIcon from '../assets/star.svg';
import CounterUp from '../components/shared/counterUp';
import CategorySlider from '../components/shared/categorySlider';

const HomePage: React.FC = () => {
  return (
    <main className="mx-auto h-full max-w-[1440px] bg-first">
      <Header />
      {/* top content */}
      <div className="h-[716px] rounded-3xl bg-[#fff] bg-home">
        <div className="pl-[75px] pt-[100px]">
          <h1 className="text-[96px] font-bold">Хто ми?</h1>
          <p className="mt-3 max-w-[732px] text-[24px] leading-[125%]">
            Ми — команда, яка створює комфорт та затишок у вашій спальні. Вже
            багато років ми допомагаємо нашим клієнтам облаштовувати особистий
            простір, пропонуючи меблі, які поєднують стиль, функціональність та
            високу якість.
          </p>
          <Button
            className="mt-7 h-[82px] text-[32px] font-bold"
            variant="small"
          >
            Читаті більше
          </Button>
        </div>
      </div>

      {/* about us */}
      <div className="px-[75px] pt-[100px]">
        <h6 className="text-[24px] font-extralight leading-7">Про нас</h6>
        <div>
          <div className="flex justify-between gap-x-[88px]">
            <h2 className="mt-5 max-w-[462px] text-[64px] font-bold leading-[120%]">
              З турботою про вас
            </h2>
            <div>
              <p className="mt-5 max-w-[740px] text-[24px] leading-[125%]">
                Ми пропонуємо якісні меблі для спальні, створені для вашого
                комфорту та затишку. У нашому асортименті — ліжка, шафи, комоди
                та інші меблі, що поєднують стиль і функціональність.
              </p>
              <p className="mt-6 max-w-[740px] text-[24px] leading-[125%]">
                Використовуємо лише екологічно чисті матеріали та сучасні
                дизайнерські рішення. Допомагаємо кожному клієнту знайти
                ідеальне рішення для свого інтер'єру, забезпечуючи професійне
                обслуговування та швидку доставку.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-between px-[18.5px]">
          <div className="w-[275px] text-center">
            <h3 className="font-main text-[96px] font-bold">
              <CounterUp to={1000} />
            </h3>
            <span className="text-[24px] font-extralight leading-8">
              тисячі задоволених клієнтів
            </span>
          </div>
          <div className="w-[275px] text-center">
            <h3 className="font-main text-[96px] font-bold">
              <CounterUp to={500} />
            </h3>
            <span className="text-[24px] font-extralight leading-8">
              п’ятсот замовлень в нашого магазину
            </span>
          </div>
          <div className="w-[275px] text-center">
            <h3 className="font-main text-[96px] font-bold">
              <CounterUp to={5} />
            </h3>
            <span className="text-[24px] font-extralight">
              п’ять років з вами
            </span>
          </div>
        </div>
      </div>

      {/* category */}
      <div className="relative mt-[75px]">
        <h4 className="mb-7 px-[75px] text-[64px]">Категорії</h4>
        <CategorySlider />
      </div>

      {/* popular furnitura */}
      <div className="mt-[60px] px-[75px]">
        <h5 className="w-[50%] text-[64px] font-bold leading-[120%]">
          Популярна фурнітура
        </h5>
        <div className="mt-[40px] flex flex-wrap items-center gap-x-[30px]">
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
        </div>

        <Button
          variant="small"
          className="mx-auto mt-[95px] flex w-[190px] justify-center"
        >
          Load more
        </Button>
      </div>

      {/* discount */}

      <div className="mt-[100px] px-[75px]">
        <img src="discount.png" />
      </div>

      {/* review */}

      <div className="mt-[90px] px-[75px]">
        <h6 className="text-[64px] font-bold">Відгуки</h6>
        <div className="mt-7 flex gap-x-8">
          <img src="review.png" />

          <div className="flex flex-col justify-between">
            <h6 className="max-w-[70%] text-[48px] font-bold leading-[125%]">
              Наші клієнти важливі для нас
            </h6>
            <div className="mt-4 flex items-center gap-x-2">
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </div>
            <p className="mt-4 max-w-[692px] text-[24px] leading-[130%]">
              Замовляла меблі для спальні в цьому магазині, і залишилася дуже
              задоволена! Великий вибір, якісні матеріали та сучасний дизайн —
              саме те, що я шукала. Менеджери допомогли підібрати ідеальний
              варіант під мої потреби, а доставка була швидкою і без проблем.
            </p>
            <div className="mt-auto flex items-center gap-x-2">
              <img className="h-10 w-10 rounded-[50%]" src="user.png" />
              <div className="text-[20px] text-[#afd2d7]">
                <p>Reviewer name</p>
                <p>Date</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* subcribe */}

      <div className="mt-[155px] flex h-[520px] w-full flex-col items-center justify-center gap-y-8 rounded-[20px] bg-second text-center">
        <h6 className="text-[40px] font-bold">
          Підпишіться аби отримати останні новини
        </h6>
        <p className="max-w-[592px] text-[24px] leading-[130%]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod
          tempor incididunt ut labore at dolore.
        </p>
        <div className="flex items-center">
          <input
            className="h-[69px] w-[690px] px-[30px] text-[20px] focus:outline-none"
            placeholder="Ваша електронна пошта"
          />
          <Button className="h-[71px] w-[219px] rounded-[5px] border-main text-[20px]">
            Підписатися
          </Button>
        </div>
      </div>

      {/* footer */}

      <Footer />
    </main>
  );
};

export default HomePage;
