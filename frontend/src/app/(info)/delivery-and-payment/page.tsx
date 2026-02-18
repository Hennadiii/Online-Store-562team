import AnimatedSection from "@/components/shared/animatedSection";
import Image from "next/image";

export const metadata = {
  title: "Cozy Corners | Доставка і Оплата",
  description: "Офіційна сторінка Доставка і оплата.",
};

const DeliveryAndPaymentPage = () => {
  return (
    <section className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8">
      <AnimatedSection className="mt-[60px]">

        {/* ===== Главный заголовок ===== */}
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-h2 uppercase text-center break-words">
  Доставка і оплата
</h1>


        {/* ===== Способи доставки ===== */}
        <h2 className="mt-12 text-[24px] font-semibold text-left">
          Способи доставки
        </h2>

        <p className="mt-4 leading-[120%]">
          Ми пропонуємо два зручних способи отримання ваших замовлень:
          <br />
          Кур&apos;єрська доставка
        </p>

        <ul className="marker:text-accent mt-4 list-disc pl-6 flex flex-col gap-2 leading-[120%]">
          <li>Наш кур&apos;єр доставить ваше замовлення прямо до дверей.</li>
          <li>Кур&apos;єрська доставка в межах міста Львова.</li>
          <li>Вартість доставки: від 90 грн.</li>
          <li>Терміни доставки: 1–3 робочих дні.</li>
        </ul>

        {/* ===== Самовивіз ===== */}
        <h2 className="mt-10 text-[24px] font-semibold text-left">
          Самовивіз
        </h2>

        <ul className="marker:text-accent mt-4 list-disc pl-6 flex flex-col gap-2 leading-[120%]">
          <li>Самовивіз з магазину у Львові.</li>
          <li>
            Графік роботи пункту видачі: Пн-Пт: 9:00–18:00,
            Сб-Нд: вихідний.
          </li>
        </ul>

        {/* ===== Оплата ===== */}
        <h2 className="mt-14 text-[24px] font-semibold text-left">
          Оплата готівкою при отриманні
        </h2>

        <p className="mt-4 leading-[120%]">
          Цей спосіб доступний при доставці:
        </p>

        <ul className="marker:text-accent mt-4 list-disc pl-6 flex flex-col gap-2 leading-[120%]">
          <li>до пунктів видачі посилок;</li>
          <li>кур&apos;єром за вказаною адресою.</li>
        </ul>

        <p className="mt-6 leading-[120%]">
          У разі укладання та виконання договору ваші персональні
          дані обробляються на підставі укладеного договору купівлі-продажу.
        </p>

        {/* ===== Онлайн оплата ===== */}
        <h2 className="mt-14 text-[24px] font-semibold text-left">
          Онлайн оплата
        </h2>

        {/* Visa */}
        <div className="mt-6 flex items-center gap-4">
          <div className="h-12 w-[70px] rounded-[6px] border border-[#d9d9d9] flex justify-center items-center p-2">
            <Image src="/visa.svg" width={49} height={16} alt="visa" />
          </div>
          <p className="leading-[120%]">
            Ви можете здійснити оплату за допомогою карти Visa або MasterCard.
          </p>
        </div>

        {/* Apple Pay */}
        <div className="mt-8 flex items-start gap-4">
          <div className="h-12 w-[70px] rounded-[6px] border border-[#d9d9d9] flex justify-center items-center p-2">
            <Image src="/apple-pay.svg" width={51} height={21} alt="apple" />
          </div>
          <p className="leading-[120%]">
            Apple Pay — мобільний платіж для пристроїв iOS.
            Підтвердження транзакції відбувається через Face ID або Touch ID.
          </p>
        </div>

        {/* ===== Заключение ===== */}
        <p className="mt-14 text-[18px]">
          Ми раді, що ви обрали наші меблі для створення затишку у вашому домі.
        </p>

        <h2 className="mt-12 text-[22px] font-semibold">
          Не знайшли відповіді на запитання?
        </h2>

        <p className="mt-4 leading-[120%]">
          Звертайтеся за телефоном:
          <span className="text-accent font-semibold">
            {" "}+38 (011) 621 16 12
          </span>
          {" "}або напишіть нам на електронну пошту.
        </p>

      </AnimatedSection>
    </section>
  );
};

export default DeliveryAndPaymentPage;
