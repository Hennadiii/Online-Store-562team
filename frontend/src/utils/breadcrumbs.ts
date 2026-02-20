interface Breadcrumb {
  label: string;
  link?: string;
}

export function getBreadcrumbs(pathname: string): Breadcrumb[] {
  const breadcrumbs: Breadcrumb[] = [
    { label: "Головна сторінка", link: "/" },
  ];

  // /catalog
  if (pathname === "/catalog") {
    breadcrumbs.push({ label: "/" });
    breadcrumbs.push({ label: "Каталог" });
    return breadcrumbs;
  }

  // /catalog/:category
  if (pathname.startsWith("/catalog/")) {
    const category = decodeURIComponent(pathname.split("/")[2]);

    breadcrumbs.push({ label: "/" });
    breadcrumbs.push({ label: "Каталог", link: "/catalog" });
    breadcrumbs.push({ label: "/" });
    breadcrumbs.push({ label: category });

    return breadcrumbs;
  }

  // /product/:id
  if (pathname.startsWith("/product/")) {
    breadcrumbs.push({ label: "/" });
    breadcrumbs.push({ label: "Каталог", link: "/catalog" });
    return breadcrumbs;
  }

  return breadcrumbs;
}
