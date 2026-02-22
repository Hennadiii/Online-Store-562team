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
  const breadcrumbs: Breadcrumb[] = [
    { label: "Головна сторінка", link: "/" },
  ];

  // --- Статические страницы ---
  if (staticPages[pathname]) {
    breadcrumbs.push({
      label: staticPages[pathname],
    });
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

  return breadcrumbs;
}