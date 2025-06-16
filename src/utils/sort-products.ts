import { Product } from "@/types/product";

export type SortOption = "name-asc" | "name-desc" | "price-asc" | "price-desc";

export function sortProducts(
  products: Product[],
  sortBy: SortOption,
): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));

    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));

    case "price-asc":
      return sorted.sort(
        (a, b) =>
          a.price * a.weights![a.weights!.length - 1] -
          b.price * b.weights![b.weights!.length - 1],
      );

    case "price-desc":
      return sorted.sort(
        (a, b) =>
          b.price * b.weights![b.weights!.length - 1] -
          a.price * a.weights![a.weights!.length - 1],
      );

    default:
      return sorted;
  }
}
