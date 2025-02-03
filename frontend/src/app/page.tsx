import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import BedArrow from "@/assets/bed-arrow.svg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import AnimatedSection from "@/components/shared/animatedSection";
import CustomSlider from "@/components/shared/customSlider";

export const metadata = {
  title: "Cozy Corners | Home",
  description: "Офіційни Основна сторінка нашого сайту.",
};

const tabs = [
  "Дивани",
  "/",
  "Ліжка",
  "/",
  "Крісла",
  "/",
  "Шафи",
  "/",
  "Тумби",
  "/",
  "Комоди",
];

const data = [
  "Дивани",
  "Ліжка",
  "Тумби",
  "Крісла",
  "Комоди",
  "Дивани",
  "Дивани2",
  "Дивани3",
  "Дивани4",
];

const HomePage: React.FC = () => {
  const renderedItems = data.map((product, idx) => (
    <div key={idx} className="h-full w-full">
      <div className="bg-[#f1f1f1] h-[316px] w-[282px] flex items-center justify-center group cursor-pointer">
        <Image
          className="group-hover:scale-105 duration-500"
          src="/divan.png"
          alt="product"
          width={262}
          height={170}
        />
      </div>
      <span className="text-[20px] mt-2 block leading-[120%]">{product}</span>
    </div>
  ));

  return (
    <section className="bg-first mx-auto h-full max-w-[1440px] overflow-hidden px-80px pb-[32px]">
      <Header />

      {/* content top */}
      <AnimatedSection>
        <div className="relative h-fit">
          <h1 className="mt-1 text-[200px] font-bold">Cozy</h1>
          <h1 className="text-right text-[200px] font-bold leading-[20%]">
            Corners
          </h1>
          <p className="absolute right-[163px] top-[134px] max-w-[350px] text-right font-second text-[24px] leading-[120%]">
            пропонує меблі, які перетворюють спальню на простір затишку та
            гармонії
          </p>
        </div>

        <div className="relative mt-[90px] flex h-[481px] w-[1280px] flex-col items-center justify-center gap-y-[10px] bg-home pt-[235px]">
          <Button>Каталог</Button>
          <Button variant="second">Консультація</Button>
          <div className="group absolute z-20 bottom-[54px] right-[134px] cursor-pointer">
            <span className="truncate ml-[33px] text-[12px] text-white transition-transform group-hover:scale-110">
              Ліжко Вівіана
            </span>
            <BedArrow className="text-[#948d80] h-[17px] w-[118px] transition-all group-hover:scale-110 group-hover:text-white" />
          </div>
        </div>
      </AnimatedSection>

      {/* catalog */}
      <AnimatedSection className="mt-[95px]">
        <h1 className="mb-[15px] text-h2">КАТАЛОГ</h1>

        <CustomSlider slidesToShow={4.25}>{renderedItems}</CustomSlider>
      </AnimatedSection>

      {/* Popular */}
      <AnimatedSection className="mt-[90px]">
        <div className="relative">
          <h2 className="text-h2 uppercase">Популярне</h2>
          <ul className="mt-[18px] flex items-center gap-x-[4.5px]">
            {tabs.map((item, index) => (
              <li key={index} className="p-2">
                <a>{item}</a>
              </li>
            ))}
          </ul>
          <Button className="absolute right-[10px] top-[54px] border-black">
            Каталог
          </Button>
        </div>

        <div className="mt-[45px] flex flex-wrap justify-between gap-y-[30px]">
          {/* first row */}
          <div className="flex gap-x-[34px]">
            <div className="w-[624px]">
              <div className="h-[357px] w-[624px] bg-[#f1f1f1] flex items-center justify-center pt-20 flex-col cursor-pointer group">
                <Image
                  className="group-hover:scale-105 duration-300"
                  src="/divan-big-1.png"
                  alt="product"
                  width={604}
                  height={166}
                />
              </div>
              <span className="leading-[120%] mt-2 block text-[20px]">
                Сканді Люкс
              </span>
              <span className="leading-[120%] mt-2 block text-[20px]">
                12 500 ₴
              </span>
            </div>
            <div className="w-[624px]">
              <div className="h-[357px] w-[624px] bg-[#f1f1f1] flex items-center justify-center pt-20 flex-col cursor-pointer group">
                <Image
                  className="group-hover:scale-105 duration-300"
                  src="/divan-big-2.png"
                  alt="product"
                  width={604}
                  height={166}
                />
              </div>
              <span className="leading-[120%] mt-2 block text-[20px]">
                Сканді Люкс
              </span>
              <span className="leading-[120%] mt-2 block text-[20px]">
                12 500 ₴
              </span>
            </div>
          </div>
          {/* second row */}
          <div className="flex gap-x-[52px]">
            <div className="h-[380px] w-[282px]">
              <div className="bg-[#f1f1f1] h-[316px] w-full flex items-center flex-col justify-center pt-20 cursor-pointer group">
                <Image
                  className="group-hover:scale-105 duration-300"
                  src="/divan.png"
                  alt="product"
                  width={262}
                  height={170}
                />
              </div>
              <span className="block mt-2 text-[20px] leading-[120%]">
                Еко Хоум
              </span>
              <span className="block mt-2 text-[20px] leading-[120%]">
                11 000 ₴
              </span>
            </div>
            <div className="h-[380px] w-[282px]">
              <div className="bg-[#f1f1f1] h-[316px] w-full flex items-center flex-col justify-center pt-20 cursor-pointer group">
                <Image
                  className="group-hover:scale-105 duration-300"
                  src="/divan.png"
                  alt="product"
                  width={262}
                  height={170}
                />
              </div>
              <span className="block mt-2 text-[20px] leading-[120%]">
                Еко Хоум
              </span>
              <span className="block mt-2 text-[20px] leading-[120%]">
                11 000 ₴
              </span>
            </div>
            <div className="h-[380px] w-[282px]">
              <div className="bg-[#f1f1f1] h-[316px] w-full flex items-center flex-col justify-center pt-20 cursor-pointer group">
                <Image
                  className="group-hover:scale-105 duration-300"
                  src="/divan.png"
                  alt="product"
                  width={262}
                  height={170}
                />
              </div>
              <span className="block mt-2 text-[20px] leading-[120%]">
                Еко Хоум
              </span>
              <span className="block mt-2 text-[20px] leading-[120%]">
                11 000 ₴
              </span>
            </div>
            <div className="h-[380px] w-[282px]">
              <div className="bg-[#f1f1f1] h-[316px] w-full flex items-center flex-col justify-center pt-20 cursor-pointer group">
                <Image
                  className="group-hover:scale-105 duration-300"
                  src="/divan.png"
                  alt="product"
                  width={262}
                  height={170}
                />
              </div>
              <span className="block mt-2 text-[20px] leading-[120%]">
                Еко Хоум
              </span>
              <span className="block mt-2 text-[20px] leading-[120%]">
                11 000 ₴
              </span>
            </div>
          </div>

          {/* third row */}
          <div className="flex gap-x-[34px]">
            <div className="w-[624px]">
              <div className="h-[357px] w-[624px] bg-[#f1f1f1] flex items-center justify-center pt-20 flex-col cursor-pointer group">
                <Image
                  className="group-hover:scale-105 duration-300"
                  src="/divan-big-1.png"
                  alt="product"
                  width={604}
                  height={166}
                />
              </div>
              <span className="leading-[120%] mt-2 block text-[20px]">
                Сканді Люкс
              </span>
              <span className="leading-[120%] mt-2 block text-[20px]">
                12 500 ₴
              </span>
            </div>
            <div className="w-[624px]">
              <div className="h-[357px] w-[624px] bg-[#f1f1f1] flex items-center justify-center pt-20 flex-col cursor-pointer group">
                <Image
                  className="group-hover:scale-105 duration-300"
                  src="/divan-big-2.png"
                  alt="product"
                  width={604}
                  height={166}
                />
              </div>
              <span className="leading-[120%] mt-2 block text-[20px]">
                Сканді Люкс
              </span>
              <span className="leading-[120%] mt-2 block text-[20px]">
                12 500 ₴
              </span>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Contact us */}
      <AnimatedSection className="mt-[90px] flex justify-between gap-x-9">
        <div className="max-w-[624px]">
          <p className="text-justify text-[50px] font-medium uppercase leading-[119%]">
            Створіть <span className="font-second text-accent">дім</span> своєї
            мрії з нашим дизайнером
          </p>

          <p className="mt-3 text-center text-[20px] leading-[120%]">
            Не знаєте, як обрати меблі для вашого простору? Залиште email, і наш
            дизайнер допоможе створити стильний та комфортний інтер’єр.
          </p>

          <form className="mt-[105px]">
            <input
              type="email"
              required
              className="h-[40px] w-full border-b-[1px] px-2 focus:outline-none"
              placeholder="Email"
            />

            <Button type="submit" className="mt-12 w-full" variant="black">
              Відправити
            </Button>
          </form>

          <p className="mt-[22px] ml-1 leading-[120%]">
            Ваша інформація буде збережена в обліковому записі магазину.
            Продовжуючи, ви погоджуєтеся з
            <a className="cursor-pointer underline ml-1">
              Політикою конфіденційності.
            </a>
          </p>
        </div>
        <div>
          <Image
            src="/homeDesign.png"
            width={620}
            height={594}
            alt="contact us"
          />
        </div>
      </AnimatedSection>

      {/* About Us */}
      <AnimatedSection className="mt-[22px]">
        <h3 className="text-h2">ПРО НАС</h3>

        <div className="mt-5 flex gap-x-9">
          <Image src="/about-us.png" width={620} height={620} alt="about-us" />

          <div>
            <div className="text-[80px] font-medium uppercase leading-[120%]">
              <h4>Наповни</h4>
              <h5 className="float-right mr-[125px] font-second font-medium lowercase text-accent">
                дім
              </h5>
              <h5 className="ml-[90px]">гармонією</h5>
            </div>
            <p className="mt-[130px] text-[20px] font-medium uppercase leading-[120%]">
              Ми пропонуємо широкий вибір меблів для спальні, включаючи більше
              1000 найменувань продукції, що поєднує стиль, комфорт і якість.
            </p>

            <p className="mt-6 text-[20px] leading-[120%]">
              У нашому асортименті — меблі від найкращих виробників, які
              задовольнять найвибагливіші смаки.
            </p>

            <Button className="mt-8 w-full border-black">Більше про нас</Button>
          </div>
        </div>
      </AnimatedSection>

      <Footer />
    </section>
  );
};

export default HomePage;
