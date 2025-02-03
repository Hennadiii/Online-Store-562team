import AnimatedSection from "@/components/shared/animatedSection";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import Pagination from "@/components/shared/pagination";
import TeamItem from "@/components/shared/teamItem";
import TeamList from "@/components/shared/teamList";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const teamMembers = [
  {
    image: "/ivan.png",
    name: "Попович Іван",
    role: "Front-end developer",
    time: "1 рік",
    description: "React, Next.js, Typescript, Redux, Tailwind CSS",
  },
  {
    image: "/olena.png",
    name: "Олена Синько",
    role: "UX-UI Designer",
    time: "8 місяців",
    description:
      "Створюю зручні інтерфейси та постійно вдосконалюю свої навички",
  },
  {
    image: "/katerina.png",
    name: "Тарасюк Катерина",
    role: "UX-UI Designer",
    time: "8 місяців",
    description:
      "Розробляю корисні рішення для бізнесу та користувачів, поєднуючи креативність та практичність",
  },
  {
    image: "/valeria.png",
    name: "Валерія Подопригор",
    role: "Project Manager",
    time: "6 місяців",
  },
  {
    image: "/dmitro.png",
    name: "Дмитро Удодік",
    role: "Java Backend Developer",
  },
];

const AboutUsPage = () => {
  return (
    <section className="bg-first mx-auto h-full max-w-[1440px] overflow-hidden px-80px pb-[32px]">
      <Header />

      <AnimatedSection>
        <nav className="mx-auto mt-[64px] flex items-center justify-center">
          <ul className="flex items-center gap-x-3">
            {["Головна сторінка", "/", "Про Нас"].map((item) => (
              <li key={item}>
                <a>{item}</a>
              </li>
            ))}
          </ul>
        </nav>
        <h1 className="mt-8 flex w-full justify-between text-justify text-[96px]">
          Меблі,{" "}
          <span className="mb-2 font-second text-[106px] leading-[132%] text-accent">
            які
          </span>{" "}
          <span className="font-medium">наповнюють</span>
        </h1>
        <h1 className="text-right text-[96px] font-medium leading-10">
          ваш дім затишком,
        </h1>
        <h1 className="mt-2 flex justify-between text-justify text-[96px] font-medium">
          стилем та{" "}
          <span className="font-second text-[106px] leading-[140%] text-accent">
            гармонією
          </span>
        </h1>
      </AnimatedSection>
      <AnimatedSection className="mt-[90px] px-[162px]">
        {/* графік роботи */}
        <div className="flex gap-x-[97px]">
          <div className="flex flex-col">
            <span className="max-w-[224px] text-[24px]">cozycorners@com</span>
            <span className="mt-2 text-[24px]">+380( 011) 621 16 12</span>
            <p className="mt-4 max-w-[170px] text-[20px] leading-[120%]">
              Графік роботи call-центру: з 09:00 до 20:00 Без вихідних
            </p>
          </div>
          <p className="mt-2 text-[28px] leading-[120%]">
            Ми віримо, що меблі — це не просто предмети інтер’єру. Це елементи,
            які створюють атмосферу, відображають ваш стиль і перетворюють
            будь-яке приміщення на дім, куди хочеться повертатися. Наша мета —
            допомогти кожному знайти ті самі меблі, які відповідають його
            уявленням про комфорт, естетику та практичність.
          </p>
        </div>

        <p className="mt-1 text-[28px] leading-[120%]">
          Ми співпрацюємо з найкращими виробниками та дизайнерами, щоб
          гарантувати{" "}
          <span className="font-semibold text-accent">високу якість</span>{" "}
          матеріалів і{" "}
          <span className="font-semibold text-accent">довговічність</span>{" "}
          продукції. Наша команда ретельно відбирає колекції, аби забезпечити
          різноманітність стилів: від мінімалістичного скандинавського до
          витонченого класичного.
        </p>

        <div className="mt-10 flex flex-col pl-[325px]">
          <Image
            height={632}
            width={632}
            src="/about-us-top.png"
            className="h-[632px] w-[632px]"
            alt="about"
          />

          <p className="ml-2 mt-10 text-[28px] leading-[120%]">
            Ми також піклуємося про те, щоб процес вибору меблів був максимально
            простим і приємним для вас. У нашому каталозі ви{" "}
            <span className="font-semibold text-accent">знайдете</span> докладні
            описи, якісні фотографії та інструменти для підбору меблів за
            стилем, розміром чи кольором.
          </p>
        </div>
        <p className="text-[28px] leading-[120%]">
          Якщо ж{" "}
          <span className="font-semibold text-accent">потрібна допомога</span> —
          наші консультанти завжди готові підказати, допомогти з вибором і
          навіть запропонувати персоналізовані рішення для вашого інтер’єру.
        </p>
      </AnimatedSection>

      <AnimatedSection className="mt-[145px]">
        <h2 className="text-h2 uppercase text-center">Наша команда</h2>

        <TeamList members={teamMembers} />
      </AnimatedSection>

      <AnimatedSection className="mt-[175px] flex justify-between gap-x-9">
        <div className="max-w-[624px]">
          <p className="text-justify text-[50px] font-medium uppercase leading-[119%]">
            Створіть <span className="font-second text-accent">дім</span> своєї
            мрії з нашим дизайнером
          </p>

          <p className="mt-3 text-center text-[20px] leading-[120%]">
            Не знаєте, як обрати меблі для вашого простору? Залиште email, і наш
            дизайнер допоможе створити стильний та комфортний інтер’єр.
          </p>

          <form className="mt-[110px]">
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

          <p className="ml-1 mt-[30px] leading-[120%]">
            Ваша інформація буде збережена в обліковому записі магазину.
            Продовжуючи, ви погоджуєтеся з{" "}
            <a className="cursor-pointer underline">
              Політикою конфіденційності.
            </a>
          </p>
        </div>
        <div>
          <Image
            width={620}
            height={594}
            className="h-[594px] w-[620px]"
            src="/homeDesign.png"
            alt="contact us"
          />
        </div>
      </AnimatedSection>

      <Footer />
    </section>
  );
};

export default AboutUsPage;
