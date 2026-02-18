import BedArrow from "@/assets/bed-arrow.svg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import AnimatedSection from "@/components/shared/animatedSection";
import CustomSlider from "@/components/shared/customSlider";

export const metadata = {
  title: "Cozy Corners | Home",
  description: "Офіційна основна сторінка нашого сайту.",
};

const tabs = ["Дивани", "Ліжка", "Крісла", "Шафи", "Тумби", "Комоди"];

const data = ["Дивани", "Ліжка", "Тумби", "Крісла", "Комоди", "Дивани2", "Дивани3", "Дивани4"];

const HomePage: React.FC = () => {
  const renderedItems = data.map((product, idx) => (
    <div key={idx} className="w-full">
      <div className="bg-[#f1f1f1] h-[200px] sm:h-[250px] flex items-center justify-center group cursor-pointer">
        <Image
          className="group-hover:scale-105 duration-300"
          src="/divan.png"
          alt={product}
          width={262}
          height={170}
        />
      </div>
      <span className="text-[16px] sm:text-[20px] mt-2 block leading-[120%]">{product}</span>
      <span className="text-[16px] sm:text-[20px] block mt-1 font-semibold">11 000 ₴</span>
    </div>
  ));

  return (
    <section className="bg-first mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pb-8">

      {/* Main Banner */}
      <AnimatedSection>
        <div className="relative h-fit">
          <h1 className="hidden lg:block text-[200px] font-bold">Cozy</h1>
          <h1 className="hidden lg:block text-[200px] font-bold text-right leading-[20%]">Corners</h1>

          <p className="absolute right-4 lg:right-[163px] top-32 lg:top-[134px] max-w-[350px] text-right font-second text-[20px] sm:text-[24px] leading-[120%]">
            пропонує меблі, які перетворюють спальню на простір затишку та гармонії
          </p>
        </div>

        <div className="relative mt-20 sm:mt-[90px] w-full h-[400px] sm:h-[481px] flex flex-col items-center justify-center gap-y-4 sm:gap-y-10 bg-home bg-cover bg-center pt-36 sm:pt-[235px] pb-10">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="w-[250px] sm:w-[297px]">Каталог</Button>
            <Button className="w-[250px] sm:w-[297px]" variant="second">Консультація</Button>
          </div>

          {/* BedViviana */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2 text-white text-xs sm:text-sm">
            <span>Ліжко Вівіана</span>
            <BedArrow className="h-[17px] w-[118px] text-[#948d80] transition-all group-hover:scale-110 group-hover:text-white" />
          </div>
        </div>
      </AnimatedSection>

      {/* Catalog Slider */}
      <AnimatedSection className="mt-20 sm:mt-[95px]">
        <h2 className="mb-4 text-h2">КАТАЛОГ</h2>
        <CustomSlider slidesToShow={4.25}>{renderedItems}</CustomSlider>
        
      </AnimatedSection>

      {/* Popular Section */}
      <AnimatedSection className="mt-20 sm:mt-[90px]">
        <div className="relative">
        {/* Популярне */}
        <h2 className="text-[50px] sm:text-[52px] md:text-[54px] uppercase mb-4">
  Популярне
</h2>




          <ul className="flex flex-wrap gap-2 sm:gap-4 mb-4">
            {tabs.map((item, index) => (
              <li key={index} className="p-2">
                <a className="cursor-pointer">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {renderedItems}
        </div>
      </AnimatedSection>

      {/* Contact Us */}
      <AnimatedSection className="mt-20 sm:mt-[90px] flex flex-col lg:flex-row justify-between gap-y-8 lg:gap-x-9">
        <div className="max-w-full lg:max-w-[624px]">
          <p className="text-[32px] sm:text-[50px] font-medium uppercase leading-[119%] text-center lg:text-left">
            Створіть <span className="font-second text-accent">дім</span> своєї мрії з нашим дизайнером
          </p>

          <p className="mt-3 text-center lg:text-left text-[16px] sm:text-[20px] leading-[120%]">
            Не знаєте, як обрати меблі для вашого простору? Залиште email, і наш дизайнер допоможе створити стильний та комфортний інтер’єр.
          </p>

          <form className="mt-8 sm:mt-[105px] flex flex-col gap-4">
            <input
              type="email"
              required
              className="h-[40px] w-full border-b-[1px] px-2 focus:outline-none"
              placeholder="Email"
            />
            <Button type="submit" className="w-full" variant="black">
              Відправити
            </Button>
          </form>

          <p className="mt-4 sm:mt-[22px] text-[14px] sm:text-[16px] leading-[120%]">
            Ваша інформація буде збережена в обліковому записі магазину. Продовжуючи, ви погоджуєтеся з
            <a className="cursor-pointer underline ml-1">Політикою конфіденційності</a>.
          </p>
        </div>

        <div className="flex justify-center lg:justify-end">
          <Image
            src="/homeDesign.png"
            width={620}
            height={594}
            alt="contact us"
            className="w-full max-w-[620px] h-auto"
          />
        </div>
      </AnimatedSection>

      {/* About Us */}
      <AnimatedSection className="mt-10 sm:mt-[22px]">
        <h3 className="text-h2 mb-4">ПРО НАС</h3>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-x-9">
          <Image
            src="/about-us.png"
            width={620}
            height={620}
            alt="about-us"
            className="w-full lg:w-[620px] h-auto"
          />
          <div className="flex flex-col justify-between">
            <div className="text-[60px] sm:text-[80px] font-medium uppercase leading-[120%]">
              <h4>Наповни</h4>
              <h5 className="float-right mr-4 sm:mr-[125px] font-second font-medium lowercase text-accent">дім</h5>
              <h5 className="ml-4 sm:ml-[90px] font-medium uppercase text-black text-[50px] sm:text-[80px] leading-[120%]">
      гармонією
    </h5>
            </div>
            <p className="mt-6 text-[16px] sm:text-[20px] font-medium uppercase leading-[120%]">
              Ми пропонуємо широкий вибір меблів для спальні, включаючи більше 1000 найменувань продукції, що поєднує стиль, комфорт і якість.
            </p>
            <p className="mt-4 text-[16px] sm:text-[20px] leading-[120%]">
              У нашому асортименті — меблі від найкращих виробників, які задовольнять найвибагливіші смаки.
            </p>
            <Button className="mt-6 w-full border-black">Більше про нас</Button>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default HomePage;
