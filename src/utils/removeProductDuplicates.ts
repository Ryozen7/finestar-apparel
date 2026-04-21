import type { Product } from "../types";

/**
 * Removes duplicate products by name, price, and category.
 * @param products Array of products
 * @returns Array of unique products
 */
export function removeProductDuplicates(products: Product[]): Product[] {
  return products.filter(
    (item, idx, arr) =>
      arr.findIndex(
        (p) =>
          p.name === item.name &&
          p.price === item.price &&
          p.category === item.category,
      ) === idx,
  );
}
