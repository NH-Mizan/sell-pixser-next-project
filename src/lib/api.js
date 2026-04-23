const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://sellpixer.websolutionit.com";

export const ASSET_BASE_URL =
  process.env.NEXT_PUBLIC_ASSET_URL?.replace(/\/$/, "") || SITE_URL;

const DEFAULT_REVALIDATE = 300;

const HOMEPAGE_CATEGORY_SLUGS = new Set([
  "mens-fashion",
  "womens-fashion",
  "cosmetics",
  "gadgets",
  "grocery",
  "home-lifestyle",
]);

function buildApiUrl(path) {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}

export async function getJson(path, { revalidate = DEFAULT_REVALIDATE, ...init } = {}) {
  const response = await fetch(buildApiUrl(path), {
    ...init,
    headers: {
      Accept: "application/json",
      ...init.headers,
    },
    next: init.cache === "no-store" ? undefined : { revalidate },
  });

  if (!response.ok) {
    throw new Error(`Request failed for ${path}: ${response.status}`);
  }

  return response.json();
}

async function getCollection(path, options) {
  try {
    const data = await getJson(path, options);
    return data?.data ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export function getAssetUrl(path) {
  if (!path) {
    return "/images/sell-pixer.webp";
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${ASSET_BASE_URL}${normalizedPath}`;
}

export async function getCategories() {
  return getCollection("/categories", { revalidate: 900 });
}

export async function getSliderItems() {
  return getCollection("/slider", { revalidate: 300 });
}

export async function getHotDealProducts() {
  return getCollection("/hotdeal-product", { revalidate: 300 });
}

export async function getHomepageProducts() {
  const categories = await getCollection("/homepage-product", { revalidate: 300 });
  return categories.filter((category) => HOMEPAGE_CATEGORY_SLUGS.has(category.slug));
}

export async function getBrands() {
  return getCollection("/brands", { revalidate: 900 });
}

export async function getCategoryProducts(id) {
  return getCollection(`/category/${id}`, { revalidate: 300 });
}

export async function getRelatedProducts(id) {
  return getCollection(`/related-product/${id}`, { revalidate: 300 });
}

export async function getProductDetails(id) {
  try {
    return await getJson(`/details/${id}`, { revalidate: 300 });
  } catch (error) {
    console.error(error);
    return null;
  }
}
