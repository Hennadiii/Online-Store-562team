import AnimatedSection from "@/components/shared/animatedSection";

export const metadata = {
  title: "Cozy Corners | Умови Повернення",
  description: "Офіційни Умови Повернення нашого сайту.",
};

const ReturnPolicyPage = () => {
  return (
    <AnimatedSection>
      <h1 className="text-h3 leading-[120%] text-justify mt-[60px] flex justify-center">
        Умови повернення
      </h1>

      <p className="leading-[120%] mt-8">
        Ми прагнемо забезпечити комфорт та задоволення від покупок, але
        розуміємо, що непорозуміння можуть <br /> траплятися. Якщо з вашим
        замовленням виникла проблема, ми зробимо все можливе, щоб її швидко
        вирішити.
      </p>

      <p className="font-semibold mt-11">
        Обмін або повернення при отриманні товару
      </p>

      <p className="mt-3 pl-2">
        1.{" "}
        <span className="ml-1">
          Невідповідність замовленню або пошкодження під час доставки.
        </span>
      </p>

      <ul className="marker:text-accent relative list-outside list-disc mt-4 pl-6 flex flex-col gap-y-4 leading-[120%]">
        <li>
          Якщо під час отримання товару ви виявили, що він не відповідає вашому
          замовленню або <br /> пошкоджений, повідомте про це кур’єра або
          менеджера пункту видачі. Вони організують <br /> повернення або обмін
          без зайвих клопотів.
        </li>
        <li>
          Для товарів, доставлених через поштові служби, повернення можливе
          тільки всієї посилки в <br /> оригінальному вигляді (не відкривайте
          упаковку інших товарів із замовлення).
        </li>
      </ul>

      <p className="font-semibold mt-[50px]">Повернення після отримання</p>

      <p className="mt-4 pl-1">
        2.{" "}
        <span className="ml-1">
          {" "}
          Дефекти або пошкодження, виявлені пізніше.
        </span>
      </p>

      <ul className="marker:text-accent relative list-outside list-disc pl-6 mt-3 leading-[120%]">
        <li className="max-w-[863px]">
          Якщо дефекти меблів або пошкодження упаковки були виявлені після
          доставки, надішліть нам детальний опис проблеми разом із фото чи
          відео. Лист необхідно надіслати з електронної адреси, використаної для
          замовлення, на cozycorners@gmail.com.
        </li>
      </ul>

      <p className="mt-3 pl-1">
        3. <span className="ml-1">Повернення неналежної якості.</span>
      </p>

      <ul className="marker:text-accent relative list-outside list-disc pl-6 mt-4 flex flex-col leading-[120%]">
        <li className="max-w-[863px]">
          Протягом 14 днів з моменту покупки ви можете повернути товар, якщо він
          не використовувався, упаковка зберегла цілісність, а товар має всі
          комплектуючі та штрих-коди виробника.
        </li>
      </ul>

      <p className="font-semibold mt-[50px]">Процедура повернення</p>

      <ul className="marker:text-accent relative list-outside list-disc pl-6 mt-4 gap-y-4 flex flex-col leading-[120%]">
        <li>Наш менеджер зв’яжеться з вами для уточнення деталей.</li>
        <li>
          У разі схвалення повернення ми організуємо візит кур’єра або пояснимо,
          як відправити товар <br /> назад.
        </li>
        <li>
          Повернення коштів здійснюється протягом 14-30 днів після отримання
          товару на склад.
        </li>
      </ul>

      <p className="font-semibold mt-[50px]">Важливі умови:</p>

      <ul className="marker:text-accent relative list-outside list-disc pl-6 mt-4 gap-y-4 flex flex-col leading-[120%]">
        <li>
          Для оформлення повернення зберігайте чек, упаковку та всі супутні
          комплектуючі.
        </li>
        <li>
          Ми не приймаємо товари, які були придбані в інших магазинах,
          пошкоджені під час використання <br /> або без обґрунтованих причин
          для повернення.
        </li>
      </ul>

      <p className="font-semibold mt-[50px]">Контактна інформація:</p>

      <p className="mt-4 leading-[120%]">
        З усіх питань звертайтеся до нас за телефоном:{" "}
        <span className="text-accent font-semibold">+380( 011) 621 16 12</span>{" "}
        або напишіть на нашу електронну <br /> пошту.
      </p>

      <p className="mt-4">Ми завжди готові допомогти! </p>
    </AnimatedSection>
  );
};

export default ReturnPolicyPage;
