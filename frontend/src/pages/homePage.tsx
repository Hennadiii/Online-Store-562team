import { Button } from '../components/ui/button';
import Header from '../components/shared/header';
import ProductItem from '../components/shared/productItem';
import Footer from '../components/shared/footer';
import StarIcon from '../assets/star.svg';
import CategorySlider from '../components/shared/categorySlider';
import BedArrow from '../assets/bed-arrow.svg';
import CategoryItem from '../components/shared/productItem';
import { Input } from 'postcss';

const tabs = [
  'Дивани',
  '/',
  'Ліжка',
  '/',
  'Крісла',
  '/',
  'Шафи',
  '/',
  'Тумби',
  '/',
  'Комоди',
];

const HomePage: React.FC = () => {
  return (
    <section className="px-80px mx-auto h-full max-w-[1440px] bg-first pb-[32px]">
      <Header />

      {/* content top */}
      <div>
        <div className="relative h-fit">
          <h1 className="mt-1 text-[200px] font-bold">Cozy</h1>
          <h1 className="text-right text-[200px] font-bold leading-[20%]">
            Corners
          </h1>
          <p className="absolute right-[163px] top-[134px] max-w-[350px] text-right font-second text-[24px] leading-[120%]">
            створює меблі, які перетворюють спальню на простір затишку та
            гармонії
          </p>
        </div>

        <div className="relative mt-[90px] flex h-[481px] w-[1280px] flex-col items-center justify-center gap-y-[10px] bg-home pt-[235px]">
          <Button>Каталог</Button>
          <Button variant="second">Консультація</Button>
          <div className="group absolute bottom-[54px] right-[134px] cursor-pointer">
            <span className="absolute bottom-3 left-[33px] text-[12px] text-white transition-transform group-hover:scale-110">
              Ліжко Вівіана
            </span>
            <BedArrow className="text-accent transition-all group-hover:scale-110 group-hover:text-white" />
          </div>
        </div>
      </div>

      {/* catalog */}
      <div className="mt-[95px]">
        <h1 className="text-h2 mb-[22px]">КАТАЛОГ</h1>
        <CategorySlider />
      </div>

      {/* Popular */}
      <div className="mt-[90px]">
        <div className="relative">
          <h3 className="text-h2 uppercase">Популярне</h3>
          <ul className="mt-[18px] flex items-center gap-x-[4.5px]">
            {tabs.map((item, index) => (
              <li key={index} className="p-2">
                <a>{item}</a>
              </li>
            ))}
          </ul>
          <Button className="border-black absolute right-[10px] top-[54px]">
            Каталог
          </Button>
        </div>

        <div className="mt-[60px] flex flex-wrap justify-between gap-y-[30px]">
          <ProductItem
            name="Сканді Люкс"
            image="divan-big-2.png"
            variant={true}
          />
          <ProductItem
            name="Комфорт Плюс"
            image="divan.png"
            price="12,500"
            variant={true}
          />
          <ProductItem name="Еко Хоум" image="divan-big-1.png" price="18,300" />
          <ProductItem name="Смарт Фолд" image="divan.png" />
          <ProductItem name="Дрімлайт" image="divan.png" />
          <ProductItem name="Космо Делюкс" image="divan.png" />
          <ProductItem
            name="Релакс Про"
            image="divan-big-2.png"
            price="25,000"
            variant={true}
          />
          <ProductItem
            name="Гармонія"
            image="divan-big-1.png"
            variant={true}
            price="12.500"
          />
        </div>
      </div>

      {/* Contact us */}

      <div className="mt-[106px] flex justify-between gap-x-9">
        <div className="max-w-[624px]">
          <p className="text-justify text-[50px] font-medium uppercase leading-[119%]">
            Створіть <span className="text-accent font-second">дім</span> своєї
            мрії з нашим дизайнером
          </p>

          <p className="mt-3 text-center text-[20px] leading-[120%]">
            Не знаєте, як обрати меблі для вашого простору? Залиште email, і наш
            дизайнер допоможе створити стильний та комфортний інтер’єр.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thanks for submit our form, we will contact you soon...');
            }}
            className="mt-[105px]"
          >
            <input
              type="email"
              required
              className="h-[40px] w-full border-b-[1px] px-2 focus:outline-none"
              placeholder="Email"
            />

            <Button type="submit" className="mt-10 w-full" variant="black">
              Відправити
            </Button>
          </form>

          <p className="mt-[55px] leading-[120%]">
            Ваша інформація буде збережена в обліковому записі магазину.
            Продовжуючи, ви погоджуєтеся з{' '}
            <a className="cursor-pointer underline">Загальними положеннями</a>{' '}
            та умовами Магазину та погоджуєтесь із{' '}
            <a className="cursor-pointer underline">
              Політикою конфіденційності.
            </a>
          </p>
        </div>
        <div>
          <img src="homeDesign.png" />
        </div>
      </div>

      {/* About Us */}

      <div className="mt-[100px]">
        <h4 className="text-h2">ПРО НАС</h4>

        <div className="mt-5 flex gap-x-9">
          <img src="about-us.png" />

          <div>
            <div className="text-[80px] font-medium uppercase leading-[120%]">
              <h5 className="">Наповни</h5>
              <h5 className="text-accent float-right mr-[125px] font-second font-medium lowercase">
                дім
              </h5>
              <h5 className="ml-[90px]">гармонією</h5>
            </div>
            <p className="mt-[120px] text-[20px] font-medium uppercase leading-[120%]">
              Ми пропонуємо широкий вибір меблів для спальні, включаючи більше
              1000 найменувань продукції, що поєднує стиль, комфорт і якість.
            </p>

            <p className="mt-6 text-[20px] leading-[120%]">
              У нашому асортименті — меблі від найкращих виробників, які
              задовольнять найвибагливіші смаки.
            </p>

            <Button className="border-black mt-8 w-full">Більше про нас</Button>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default HomePage;
