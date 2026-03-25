interface Breadcrumb {
  label: string;
  link?: string;
}

const staticPages: Record<string, string> = {
  "/about-us": "Про нас",
  "/delivery-and-payment": "Доставка і оплата",
  "/contacts": "Контакти",
  "/checkout": "Оформлення замовлення",

  // footer pages
  "/privacy-policy": "Політика конфіденційності",
  "/return-policy": "Умови повернення",
  "/public-offer": "Договір оферти",
};

export function getBreadcrumbs(pathname: string): Breadcrumb[] {
  // Нормалізація: прибираємо trailing slash (крім кореня)
  const path = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  console.log("[Breadcrumbs] pathname:", pathname, "→ path:", path); // временно

  const breadcrumbs: Breadcrumb[] = [
    { label: "Головна сторінка", link: "/" },
  ];

  // /profile (точне співпадіння)
  if (path === "/profile") {
    breadcrumbs.push({ label: "Мій профіль" });
    return breadcrumbs;
  }

  // /profile/* (підсторінки)
  if (path.startsWith("/profile/")) {
    breadcrumbs.push({ label: "Мій профіль", link: "/profile" });

    const subPage: Record<string, string> = {
      "/profile/orders": "Мої замовлення",
      "/profile/settings": "Дані облікового запису",
      "/profile/address": "Адреси доставки",
    };

    if (subPage[path]) {
      breadcrumbs.push({ label: subPage[path] });
    }

    return breadcrumbs;
  }

  // Статичні сторінки
  if (staticPages[path]) {
    breadcrumbs.push({ label: staticPages[path] });
    return breadcrumbs;
  }

  // /catalog
  if (path === "/catalog") {
    breadcrumbs.push({ label: "Каталог" });
    return breadcrumbs;
  }

  // /catalog/:category
  if (path.startsWith("/catalog/")) {
    const category = decodeURIComponent(path.split("/")[2]);
    breadcrumbs.push({ label: "Каталог", link: "/catalog" });
    breadcrumbs.push({ label: category });
    return breadcrumbs;
  }

  // /product/:id
  if (path.startsWith("/product/")) {
    breadcrumbs.push({ label: "Каталог", link: "/catalog" });
    return breadcrumbs;
  }

  // /orders/:id
  if (path.startsWith("/orders/")) {
    breadcrumbs.push({ label: "Мої замовлення", link: "/profile/orders" });
    breadcrumbs.push({ label: "Деталі замовлення" });
    return breadcrumbs;
  }

  return breadcrumbs;
}