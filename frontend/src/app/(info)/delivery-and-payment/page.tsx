import AnimatedSection from "@/components/shared/animatedSection";
import Image from "next/image";

export const metadata = {
  title: "Cozy Corners | Доставка і Оплата",
  description: "Офіційна Доставка і оплата нашого сайту.",
};

const DeliveryAndPaymentPage = () => {
  return (
    <AnimatedSection>
      <h1 className="text-h3 leading-[120%] text-justify mt-[60px] flex justify-center">
        Доставка і оплата
      </h1>

      <p className="font-semibold mt-7">Способи доставки</p>

      <p className="leading-[120%] mt-4">
        Ми пропонуємо два зручних способи отримання ваших замовлень: <br />{" "}
        Кур&apos;єрська доставка
      </p>

      <ul className="marker:text-accent relative list-outside list-disc pl-6 flex flex-col leading-[120%]">
        <li>Наш кур&apos;єр доставить ваше замовлення прямо до дверей.</li>
        <li>Кур&apos;єрська доставка в межах міста Львова</li>
        <li>Вартість доставки: від 90 грн</li>
        <li>Терміни доставки: [1-3 робочих дні].</li>
        <li className="list-none absolute top-[75px] left-0">Самовивіз</li>
        <li className="mt-4">Самовивіз з магазину у Львові</li>
        <li>
          Графік роботи пункту видачі: [ Пн-Пт: 9:00–18:00, Сб-Нд: вихідний]
        </li>
      </ul>

      <p className="mt-16 leading-[120%] font-semibold">
        Оплата готівкою при отриманні <br /> Цей спосіб доступний при доставці:
      </p>

      <ul className="marker:text-accent mt-12 list-outside list-disc pl-7 flex flex-col gap-y-4 leading-[120%]">
        <li>до пунктів видачі посилок;</li>
        <li>
          кур&apos;єром, який доставить ваше замовлення за вказаною адресою.
        </li>
      </ul>

      <p className="leading-[120%] mt-4">
        У разі укладання та виконання договору та надання послуг, якими ви
        хочете скористатися, ваші <br /> персональні дані обробляються на
        підставі укладеного договору купівлі-продажу (ст. 6(1)(b) ЗРЗД).
      </p>

      <p className="mt-14 font-semibold">
        Оплата готівкою при отриманні <br /> Цей спосіб доступний при доставці:
      </p>

      <ul className="marker:text-accent mt-12 list-outside list-disc pl-7 flex flex-col gap-y-4 leading-[120%]">
        <li>до пунктів видачі посилок;</li>
        <li>
          кур&apos;єром, який доставить ваше замовлення за вказаною адресою.
        </li>
      </ul>

      <div className="mt-14 h-12 w-[70px] rounded-[6px] border border-[#d9d9d9] flex justify-between items-center p-2">
        <Image src="/visa.svg" width={49} height={16} alt="visa" />
      </div>

      <p className="mt-5 text-[20px] leading-[120%]">
        Ви можете здійснити оплату за допомогою карти Visa або MasterCard,
        обравши <br /> зручний для вас спосіб, кожен із яких є миттєвою онлайн
        оплатою
      </p>

      <div className="mt-14 h-12 w-[70px] rounded-[6px] border border-[#d9d9d9] flex justify-between items-center p-2">
        <Image src="/apple-pay.svg" width={51} height={21} alt="apple" />
      </div>

      <p className="mt-6 max-w-[875px] leading-[120%] text-[20px]">
        Apple Pay - це мобільний платіж, призначений для власників пристроїв на
        базі IOS. Якщо ви бажаєте сплатити за допомогою цього методу, оберіть
        Apple Pay як спосіб оплати і перейдіть до підбиття підсумків.
        Підтвердіть транзакцію за допомогою Face ID або Touch ID. Під час
        транзакції Apple Pay використовує номер пристрою та унікальний код
        транзакції, номер вашої картки не зберігається.
      </p>

      <p className="mt-14 text-[20px]">
        Ми раді, що ви обрали наші меблі для створення затишку у вашому домі.
      </p>

      <p className="mt-12 font-semibold">Не знайшов відповіді на запитання?</p>

      <p className="mt-12 leading-[120%]">
        З усіх питань звертайтеся до нас за телефоном:{" "}
        <span className="text-accent font-semibold">+380( 011) 621 16 12</span>{" "}
        або напишіть на нашу електронну <br /> пошту.
      </p>
    </AnimatedSection>
  );
};

export default DeliveryAndPaymentPage;
