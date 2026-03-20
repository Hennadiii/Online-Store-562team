import type {
  GetProductsParams,
  PaginatedResponse,
  ProductDto,
} from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Таймаут 8 секунд
function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  ms = 8000
): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ms);

  return fetch(url, { ...options, signal: controller.signal })
    .finally(() => clearTimeout(timeout));
}

function buildParams(params: GetProductsParams): URLSearchParams {
  const sp = new URLSearchParams();

  sp.set("page", String(params.page));
  sp.set("pageSize", String(params.pageSize));
  sp.set("sort", params.sort ?? "addedAt");
  sp.set("order", params.order ?? "desc");

  const f = params.filter ?? {};

  if (f.category)               sp.set("category", f.category);
  if (f.minPrice !== undefined) sp.set("minPrice", String(f.minPrice));
  if (f.maxPrice !== undefined) sp.set("maxPrice", String(f.maxPrice));
  if (f.producer)               sp.set("producer", f.producer);

  return sp;
}

export async function getProducts(
  params: GetProductsParams,
  signal?: AbortSignal
): Promise<PaginatedResponse<ProductDto>> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  if (signal) {
    signal.addEventListener("abort", () => {
      controller.abort();
      clearTimeout(timeout);
    });
  }

  try {
    const res = await fetch(`${API_URL}/products?${buildParams(params)}`, {
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error(`getProducts failed: ${res.status}`);
    }

    return res.json();
  } catch (e) {
    clearTimeout(timeout);
    throw e;
  }
}

export async function getProductsByCategory(
  category: string,
  page = 0,
  pageSize = 50
): Promise<PaginatedResponse<ProductDto>> {
  return getProducts({ filter: { category }, page, pageSize });
}

export async function getProductById(id: number): Promise<ProductDto> {
  const res = await fetchWithTimeout(`${API_URL}/products/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) throw new Error("NOT_FOUND");
  if (!res.ok) throw new Error(`getProductById failed: ${res.status}`);

  return res.json();
}

export async function createProduct(
  product: Omit<ProductDto, "id">
): Promise<void> {
  const res = await fetchWithTimeout(`${API_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!res.ok) throw new Error(`createProduct failed: ${res.status}`);
}

export async function updateProduct(
  id: number,
  product: Omit<ProductDto, "id">
): Promise<void> {
  const res = await fetchWithTimeout(`${API_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!res.ok) throw new Error(`updateProduct failed: ${res.status}`);
}

export async function deleteProduct(id: number): Promise<void> {
  const res = await fetchWithTimeout(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error(`deleteProduct failed: ${res.status}`);
}

/**
 * 🔍 Быстрый поиск (для SearchModal)
 */
export async function searchProducts(query: string): Promise<ProductDto[]> {
  const res = await fetchWithTimeout(
    `${API_URL}/products/search/simple?q=${encodeURIComponent(query)}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error(`searchProducts failed: ${res.status}`);
  }

  return res.json();
}