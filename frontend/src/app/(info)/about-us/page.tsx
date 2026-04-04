import AnimatedSection from "@/components/shared/animatedSection";
import TeamList from "@/components/about-us/teamList";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import EmailForm from "@/components/shared/EmailForm";

export const metadata = {
  title: "Cozy Corners | Про нас",
  description: "Офіційна сторінка Про нас нашого сайту.",
};

const AboutUsPage = () => {
  return (
    <section className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* ===== Главный заголовок ===== */}
      <AnimatedSection threshold={0.03} className="mt-10 text-center">
        <h1 className="text-[40px] sm:text-[70px] lg:text-[96px] font-medium leading-[110%]">
          Меблі{" "}
          <span className="font-second text-accent">
            які
          </span>{" "}
          наповнюють
        </h1>

        <h1 className="text-[40px] sm:text-[70px] lg:text-[96px] font-medium leading-[110%]">
          ваш дім затишком,
        </h1>

        <h1 className="text-[40px] sm:text-[70px] lg:text-[96px] font-medium leading-[110%]">
          стилем та{" "}
          <span className="font-second text-accent">
            гармонією
          </span>
        </h1>
      </AnimatedSection>

      {/* ===== Контакты + текст ===== */}
      <AnimatedSection className="mt-[60px]" threshold={0.01}>
        <div className="flex flex-col lg:flex-row gap-10">

          <div className="flex flex-col text-[18px] sm:text-[20px]">
            <span>cozycorners@com</span>
            <span className="mt-2">+38 (011) 621 16 12</span>
            <p className="mt-4 max-w-[250px] leading-[120%]">
              Графік роботи call-центру: з 09:00 до 20:00 Без вихідних
            </p>
          </div>

          <p className="text-[18px] sm:text-[22px] lg:text-[28px] leading-[120%]">
            Ми віримо, що меблі — це не просто предмети інтер’єру. Це елементи,
            які створюють атмосферу, відображають ваш стиль і перетворюють
            будь-яке приміщення на дім, куди хочеться повертатися. Наша мета —
            допомогти кожному знайти ті самі меблі, які відповідають його
            уявленням про комфорт, естетику та практичність.
          </p>
        </div>

        <p className="mt-6 text-[18px] sm:text-[22px] lg:text-[28px] leading-[120%]">
          Ми співпрацюємо з найкращими виробниками та дизайнерами, щоб
          гарантувати{" "}
          <span className="font-semibold text-accent">високу якість</span>{" "}
          матеріалів і{" "}
          <span className="font-semibold text-accent">довговічність</span>{" "}
          продукції. Наша команда ретельно відбирає колекції.
        </p>

        {/* ===== Картинка ===== */}
        <div className="mt-10 flex flex-col items-center lg:items-end">
          <Image
            src="/about-us-top.png"
            width={632}
            height={632}
            alt="about"
            className="w-full max-w-[632px] h-auto"
          />

          <p className="mt-8 text-[18px] sm:text-[22px] lg:text-[28px] leading-[120%] text-center lg:text-left">
            Ми також піклуємося про те, щоб процес вибору меблів був максимально
            простим і приємним для вас. У нашому каталозі ви{" "}
            <span className="font-semibold text-accent">знайдете</span> докладні
            описи, якісні фотографії та інструменти для підбору.
          </p>
        </div>

        <p className="mt-6 text-[18px] sm:text-[22px] lg:text-[28px] leading-[120%]">
          Якщо ж{" "}
          <span className="font-semibold text-accent">потрібна допомога</span>{" "}
          — наші консультанти завжди готові підказати та запропонувати
          персоналізовані рішення.
        </p>
      </AnimatedSection>

      {/* ===== Наша команда ===== */}
      <AnimatedSection className="mt-[120px]" threshold={0.03}>
      <div className="flex justify-center">
  <h2 className="text-h2 uppercase">
    Наша команда
  </h2>
</div>



        <div className="mt-10">
          <TeamList />
        </div>
      </AnimatedSection>

      {/* ===== Блок с дизайнером ===== */}
      <AnimatedSection
        className="mt-[120px] flex flex-col lg:flex-row gap-12"
        threshold={0.03}
      >
        <div className="max-w-[624px] mx-auto lg:mx-0">
          <p className="text-[28px] sm:text-[40px] lg:text-[50px] font-medium uppercase leading-[119%] text-center lg:text-left">
            Створіть{" "}
            <span className="font-second text-accent">дім</span>{" "}
            своєї мрії з нашим дизайнером
          </p>

          <p className="mt-4 text-[16px] sm:text-[18px] text-center lg:text-left">
            Не знаєте, як обрати меблі? Залиште email, і наш дизайнер
            допоможе створити стильний та комфортний інтер’єр.
          </p>

          <EmailForm />

          <p className="mt-6 text-[14px] leading-[120%] text-center lg:text-left">
            Ваша інформація буде збережена в обліковому записі магазину.
            Продовжуючи, ви погоджуєтеся з{" "}
            <Link href="/privacy-policy" className="underline ml-1">
  Політикою конфіденційності
</Link>

          </p>
        </div>

        <div className="flex justify-center">
          <Image
            src="/homeDesign.png"
            width={620}
            height={594}
            alt="contact us"
            className="w-full max-w-[620px] h-auto"
          />
        </div>
      </AnimatedSection>

    </section>
  );
};

export default AboutUsPage;
