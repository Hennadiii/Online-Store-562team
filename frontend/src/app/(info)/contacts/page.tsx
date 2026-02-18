import AnimatedSection from "@/components/shared/animatedSection";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Cozy Corners | Контакти",
  description: "Офіційні контакти нашого сайту.",
};

const ContactsPage = () => {
  return (
    <section className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
      <AnimatedSection className="mt-[60px]">

        {/* ===== Заголовок ===== */}
        <h1 className="uppercase text-center font-semibold leading-tight
          text-[clamp(28px,5vw,48px)]">
          Контакти
        </h1>

        {/* ===== Контент ===== */}
        <div className="mt-14 flex flex-col lg:flex-row gap-12 lg:gap-[110px] items-start">

          {/* ===== Левая часть ===== */}
          <div className="w-full lg:max-w-[624px]">
            <p className="font-semibold text-lg">
              Ми завжди на звʼязку!
            </p>

            <p className="mt-6 leading-[140%] text-muted-foreground">
              Ми відповідаємо на всі ваші запити через телефон або електронну
              пошту. Зателефонуйте або надішліть листа — ваше питання не залишиться без уваги.
            </p>

            <p className="mt-8">
              <span className="font-semibold">Наш телефон:</span>
              <span className="underline text-accent ml-2 font-semibold hover:opacity-80 transition">
                +38 (011) 621 16 12
              </span>
            </p>

            <p className="mt-3">
              <span className="font-semibold">Наша пошта:</span>
              <span className="underline text-accent ml-2 font-semibold hover:opacity-80 transition">
                cozycorners@gmail.com
              </span>
            </p>
          </div>

          {/* ===== Premium форма ===== */}
          <form className="w-full lg:max-w-[547px] flex flex-col gap-8">

            {/* Input block */}
            <div className="group flex flex-col gap-2">
              <label className="text-sm text-accent transition-all group-focus-within:text-black">
                Імʼя
              </label>
              <input
                className="w-full h-[48px] px-3 border-b border-black/40
                focus:border-black focus:outline-none
                transition-all duration-300
                placeholder:text-black/40"
                placeholder="Введіть ваше імʼя"
              />
            </div>

            <div className="group flex flex-col gap-2">
              <label className="text-sm text-accent transition-all group-focus-within:text-black">
                Email
              </label>
              <input
                type="email"
                className="w-full h-[48px] px-3 border-b border-black/40
                focus:border-black focus:outline-none
                transition-all duration-300
                placeholder:text-black/40"
                placeholder="Введіть ваше email"
              />
            </div>

            <div className="group flex flex-col gap-2">
              <label className="text-sm text-accent transition-all group-focus-within:text-black">
                Повідомлення
              </label>
              <textarea
                className="w-full min-h-[120px] px-3 py-2 border-b border-black/40
                focus:border-black focus:outline-none
                transition-all duration-300
                resize-none
                placeholder:text-black/40"
                placeholder="Текст повідомлення"
              />
            </div>

            {/* Кнопка */}
            <Button
              className="mt-4 w-full lg:w-auto border-black
              hover:bg-black hover:text-white
              transition-all duration-300">
              Відправити
            </Button>

          </form>
        </div>

      </AnimatedSection>
    </section>
  );
};

export default ContactsPage;
