import AnimatedSection from "@/components/shared/animatedSection";

export const metadata = {
  title: "Cozy Corners | Умови Повернення",
  description: "Офіційні умови повернення нашого сайту.",
};

const ReturnPolicyPage = () => {
  return (
    <AnimatedSection className="mx-auto max-w-[900px] px-4">

      {/* Заголовок */}
      <h1 className="text-h3 leading-[120%] mt-[60px] text-center">
        Умови повернення
      </h1>

      {/* Вступ */}
      <p className="mt-8 text-base leading-[140%] text-muted-foreground">
        Ми прагнемо забезпечити комфорт та задоволення від покупок, але
        розуміємо, що непорозуміння можуть траплятися. Якщо з вашим замовленням
        виникла проблема, ми зробимо все можливе, щоб її швидко вирішити.
      </p>

      {/* Блок 1 */}
      <h2 className="mt-11 font-semibold">
        Обмін або повернення при отриманні товару
      </h2>

      <p className="mt-4 text-base leading-[140%]">
        1. Невідповідність замовленню або пошкодження під час доставки.
      </p>

      <ul className="marker:text-accent mt-4 list-disc pl-6 flex flex-col gap-3 text-base leading-[140%]">
        <li>
          Якщо під час отримання товару ви виявили, що він не відповідає
          замовленню або пошкоджений, повідомте про це кур’єра або менеджера
          пункту видачі.
        </li>
        <li>
          Для товарів, доставлених поштовими службами, повернення можливе тільки
          всієї посилки в оригінальному вигляді.
        </li>
      </ul>

      {/* Блок 2 */}
      <h2 className="mt-12 font-semibold">Повернення після отримання</h2>

      <p className="mt-4 text-base leading-[140%]">
        2. Дефекти або пошкодження, виявлені пізніше.
      </p>

      <ul className="marker:text-accent mt-4 list-disc pl-6 text-base leading-[140%]">
        <li>
          Якщо дефекти були виявлені після доставки, надішліть нам опис проблеми
          разом із фото або відео на адресу cozycorners@gmail.com.
        </li>
      </ul>

      <p className="mt-4 text-base leading-[140%]">
        3. Повернення неналежної якості.
      </p>

      <ul className="marker:text-accent mt-4 list-disc pl-6 text-base leading-[140%]">
        <li>
          Протягом 14 днів ви можете повернути товар, якщо він не використовувався
          і збережено упаковку та комплектуючі.
        </li>
      </ul>

      {/* Блок 3 */}
      <h2 className="mt-12 font-semibold">Процедура повернення</h2>

      <ul className="marker:text-accent mt-4 list-disc pl-6 flex flex-col gap-3 text-base leading-[140%]">
        <li>Менеджер зв’яжеться з вами для уточнення деталей.</li>
        <li>Ми організуємо повернення або пояснимо процес відправлення.</li>
        <li>Повернення коштів здійснюється протягом 14–30 днів.</li>
      </ul>

      {/* Блок 4 */}
      <h2 className="mt-12 font-semibold">Важливі умови</h2>

      <ul className="marker:text-accent mt-4 list-disc pl-6 flex flex-col gap-3 text-base leading-[140%]">
        <li>
          Зберігайте чек, упаковку та комплектуючі для оформлення повернення.
        </li>
        <li>
          Ми не приймаємо товари, пошкоджені під час використання або без
          обґрунтованих причин.
        </li>
      </ul>

      {/* Контакти */}
      <h2 className="mt-12 font-semibold">Контактна інформація</h2>

      <p className="mt-4 text-base leading-[140%]">
        З усіх питань звертайтеся за телефоном:
        <span className="ml-1 font-semibold text-accent">
          +38 (011) 621 16 12
        </span>{" "}
        або напишіть на нашу електронну пошту:
        <span className="ml-1 font-medium">cozycorners@gmail.com</span>
      </p>

      <p className="mt-6 text-base leading-[140%]">
        Ми завжди готові допомогти!
      </p>

    </AnimatedSection>
  );
};

export default ReturnPolicyPage;