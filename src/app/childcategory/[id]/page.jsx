import TaxonomyProductsClient from "@/components/Products/TaxonomyProductsClient";
import { getCategories, getChildCategoryProducts } from "@/lib/api";
import { findChildCategoryById } from "@/lib/taxonomy";

export const revalidate = 300;

export async function generateMetadata({ params }) {
  const { id } = await params;
  const categories = await getCategories();
  const childCategory = findChildCategoryById(categories, id);

  return {
    title: childCategory?.name ? `${childCategory.name} | Sell-Pixers` : "Child Category | Sell-Pixers",
    description: childCategory?.name
      ? `Shop ${childCategory.name} products at Sell-Pixers.`
      : "Shop child category products at Sell-Pixers.",
  };
}

export default async function ChildCategoryPage({ params }) {
  const { id } = await params;
  const [categories, products] = await Promise.all([
    getCategories(),
    getChildCategoryProducts(id),
  ]);
  const childCategory = findChildCategoryById(categories, id);

  return (
    <TaxonomyProductsClient
      title={childCategory?.name || "Child Category Products"}
      products={products}
    />
  );
}
