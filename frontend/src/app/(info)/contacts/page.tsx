import AnimatedSection from "@/components/shared/animatedSection";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/shared/ContactForm";

export const metadata = {
  title: "Cozy Corners | Контакти",
  description: "Офіційні контакти нашого сайту.",
};

const ContactsPage = () => {
  return (
    <section className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
      <AnimatedSection className="mt-[60px]">

        {/* ===== Заголовок ===== */}
        <h1 className="text-h2 mt-14 text-center uppercase w-full flex justify-center">
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
          <ContactForm />
        </div>

      </AnimatedSection>
    </section>
  );
};

export default ContactsPage;
