import { navTo } from "./navigations";

interface Breadcrumb {
  label: string;
  link?: string;
}

// Дефолтные элементы, чтобы не дублировать
const homeBreadcrumb: Breadcrumb = {
  label: "Головна сторінка",
  link: navTo.home,
};
const separator: Breadcrumb = { label: "/" };

// Указываем, что ключом может быть string | RegExp
type BreadcrumbsMap = Map<string | RegExp, { items: Breadcrumb[] }>;

// prettier-ignore
/* eslint-disable */
export const dynamicBreadcrumbs: BreadcrumbsMap = new Map([
  ["/profile", { items: [homeBreadcrumb, separator, { label: "Мої замовлення" }] }],
  ["/catalog", { items: [homeBreadcrumb, separator, { label: "Каталог" }] }],
  ["/contacts", { items: [homeBreadcrumb, separator, { label: "Контакти" }] }],
  ["/checkout", { items: [homeBreadcrumb, separator, { label: "Оформлення замовлення" }] }],
  ["/about-us", { items: [homeBreadcrumb, separator, { label: "Про нас" }] }],
  ["/privacy-policy", { items: [homeBreadcrumb, separator, { label: "Політика Конфіденційності" }] }],
  ["/public-offer", { items: [homeBreadcrumb, separator, { label: "Договір публічної оферти" }] }],
  ["/delivery-and-payment", { items: [homeBreadcrumb, separator, { label: "Доставка і оплата" }] }],
  ["/return-policy", { items: [homeBreadcrumb, separator, { label: "Умови повернення" }] }],
  [
    /^\/product\/[^/]+$/, // Регулярное выражение для /product/:id
    {
      items: [
        homeBreadcrumb,
        separator,
        { label: "Каталог", link: navTo.catalog },
        separator,
        { label: "Дивани" },
        separator,
        { label: "Еко хоум" },
      ],
    },
  ],
  ["/divans", { items: 
  [
    homeBreadcrumb,
    separator,
    {label: 'Каталог', link: navTo.catalog },
    separator,
    {label: 'Дивани'}
  ]}],
] as [string | RegExp, { items: Breadcrumb[] }][]); // <-- явное приведение типов

// Функция для получения хлебных крошек
export function getBreadcrumbs(pathname: string): Breadcrumb[] {
  return (
    [...dynamicBreadcrumbs].find(([key]) =>
      typeof key === "string" ? key === pathname : key.test(pathname),
    )?.[1].items || []
  );
}
