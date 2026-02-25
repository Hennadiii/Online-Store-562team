interface Breadcrumb {
  label: string;
  link?: string;
}

const staticPages: Record<string, string> = {
  "/about-us": "Про нас",
  "/delivery-and-payment": "Доставка і оплата",
  "/contacts": "Контакти",
  "/checkout": "Оформлення замовлення",
  "/profile": "Мій профіль",

  // footer pages
  "/privacy-policy": "Політика конфіденційності",
  "/return-policy": "Умови повернення",
  "/public-offer": "Договір оферти",
};

export function getBreadcrumbs(pathname: string): Breadcrumb[] {
  const breadcrumbs: Breadcrumb[] = [
    { label: "Головна сторінка", link: "/" },
  ];

  // /profile/*
  if (pathname.startsWith("/profile/")) {
    breadcrumbs.push({ label: "Мій профіль", link: "/profile" });

    const subPage: Record<string, string> = {
      "/profile/orders": "Мої замовлення",
      "/profile/settings": "Дані облікового запису",
      "/profile/address": "Адреси доставки",
    };

    if (subPage[pathname]) {
      breadcrumbs.push({ label: subPage[pathname] });
    }

    return breadcrumbs;
  }

  // Статические страницы
  if (staticPages[pathname]) {
    breadcrumbs.push({ label: staticPages[pathname] });
    return breadcrumbs;
  }

  // /catalog
  if (pathname === "/catalog") {
    breadcrumbs.push({ label: "Каталог" });
    return breadcrumbs;
  }

  // /catalog/:category
  if (pathname.startsWith("/catalog/")) {
    const category = decodeURIComponent(pathname.split("/")[2]);
    breadcrumbs.push({ label: "Каталог", link: "/catalog" });
    breadcrumbs.push({ label: category });
    return breadcrumbs;
  }

  // /product/:id
  if (pathname.startsWith("/product/")) {
    breadcrumbs.push({ label: "Каталог", link: "/catalog" });
    return breadcrumbs;
  }

  // /orders/:id
  if (pathname.startsWith("/orders/")) {
    breadcrumbs.push({ label: "Мої замовлення", link: "/profile/orders" });
    breadcrumbs.push({ label: "Деталі замовлення" });
    return breadcrumbs;
  }

  return breadcrumbs;
}