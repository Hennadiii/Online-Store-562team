import AnimatedSection from "@/components/shared/animatedSection";

export const metadata = {
  title: "Cozy Corners | Договір публічної оферти",
  description: "Офіційний договір публічної оферти нашого сайту.",
};

const PublicOfferPage = () => {
  return (
    <AnimatedSection className="mx-auto max-w-[900px] px-4">

      {/* Заголовок */}
      <h1 className="text-h3 leading-[120%] mt-[60px] text-center">
        Договір публічної оферти
      </h1>

      {/* Вступ */}
      <p className="mt-8 font-semibold">
        Інтернет-магазин «Cozy Corners»
      </p>

      <p className="mt-4 text-base leading-[140%] text-muted-foreground">
        Цей договір є публічною офертою та регулює умови купівлі-продажу товарів
        через веб-сайт інтернет-магазину «Cozy Corners» для будь-якої фізичної
        або юридичної особи, що здійснює покупку.
      </p>

      {/* 1 */}
      <h2 className="mt-12 font-semibold">
        1. Загальні положення
      </h2>

      <p className="mt-4 text-base leading-[140%]">
        1.1. Цей Договір є публічною пропозицією укласти договір купівлі-продажу
        відповідно до законодавства України.
      </p>

      <p className="mt-3 text-base leading-[140%]">
        1.2. Прийняттям цього Договору вважається оформлення замовлення
        Покупцем на сайті.
      </p>

      {/* 2 */}
      <h2 className="mt-12 font-semibold">
        2. Предмет договору
      </h2>

      <p className="mt-4 text-base leading-[140%]">
        2.1. Продавець зобов’язується передати у власність Покупця товари,
        обрані ним у каталозі, а Покупець — прийняти та оплатити їх.
      </p>

      <p className="mt-3 text-base leading-[140%]">
        2.2. Договір поширюється на всі товари, представлені на сайті на момент
        замовлення.
      </p>

      {/* 3 */}
      <h2 className="mt-12 font-semibold">
        3. Оформлення замовлення
      </h2>

      <p className="mt-4 text-base leading-[140%]">
        3.1. Покупець оформлює замовлення самостійно через сайт або через
        менеджера.
      </p>

      <p className="mt-3 text-base leading-[140%]">
        3.2. Замовлення вважається прийнятим після підтвердження менеджером.
      </p>

      {/* 4 */}
      <h2 className="mt-12 font-semibold">
        4. Умови оплати
      </h2>

      <p className="mt-4 text-base leading-[140%]">
        4.1. Покупець оплачує замовлення одним із способів, зазначених на сайті.
      </p>

      <p className="mt-3 text-base leading-[140%]">
        4.2. У разі передоплати відправлення здійснюється після зарахування
        коштів.
      </p>

      {/* 5 */}
      <h2 className="mt-12 font-semibold">
        5. Доставка та передача товару
      </h2>

      <p className="mt-4 text-base leading-[140%]">
        5.1. Продавець здійснює доставку за адресою, вказаною Покупцем.
      </p>

      <p className="mt-3 text-base leading-[140%]">
        5.2. Покупець зобов’язується перевірити товар при отриманні та повідомити
        про дефекти протягом 24 годин.
      </p>

      {/* 6 */}
      <h2 className="mt-12 font-semibold">
        6. Повернення товару
      </h2>

      <p className="mt-4 text-base leading-[140%]">
        6.1. Повернення здійснюється відповідно до Закону України «Про захист
        прав споживачів».
      </p>

      <p className="mt-3 text-base leading-[140%]">
        6.2. Товар можна повернути протягом 14 днів за умови збереження
        товарного вигляду.
      </p>

      {/* 7 */}
      <h2 className="mt-12 font-semibold">
        7. Гарантійні зобов’язання
      </h2>

      <p className="mt-4 text-base leading-[140%]">
        7.1. На товари поширюється гарантія виробника.
      </p>

      <p className="mt-3 text-base leading-[140%]">
        7.2. Гарантія не поширюється на пошкодження через неправильне
        використання.
      </p>

      {/* 8 */}
      <h2 className="mt-12 font-semibold">
        8. Відповідальність сторін
      </h2>

      <p className="mt-4 text-base leading-[140%]">
        8.1. Продавець не несе відповідальності за:
      </p>

      <ul className="mt-3 list-disc pl-6 flex flex-col gap-2 text-base leading-[140%]">
        <li>затримки доставки транспортними службами;</li>
        <li>неправильне використання товару;</li>
      </ul>

      <p className="mt-3 text-base leading-[140%]">
        8.2. Покупець несе відповідальність за достовірність даних.
      </p>

      {/* 9 */}
      <h2 className="mt-12 font-semibold">
        9. Інші умови
      </h2>

      <p className="mt-4 text-base leading-[140%]">
        9.1. Договір діє з моменту оформлення замовлення до виконання
        зобов’язань.
      </p>

      <p className="mt-3 text-base leading-[140%]">
        9.2. Спори вирішуються шляхом переговорів або у судовому порядку.
      </p>

      {/* 10 */}
      <h2 className="mt-12 font-semibold">
        10. Контактна інформація
      </h2>

      <div className="mt-4 flex flex-col gap-2 text-base leading-[140%]">
        <p>Продавець: ФОП Вороніна Валентина Олексіївна</p>
        <p>Назва: Cozy Corners</p>
        <p>Адреса: вул. Львівська, 11</p>
        <p>Телефон: +380 (011) 621 16 12</p>
        <p>Email: cozycorners@gmail.com</p>
      </div>

    </AnimatedSection>
  );
};

export default PublicOfferPage;