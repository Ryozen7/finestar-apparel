import { removeProductDuplicates } from "../removeProductDuplicates";
import type { Product } from "../../types";

describe("removeProductDuplicates", () => {
  const mockProducts: Product[] = [
    {
      id: "1",
      name: "T-Shirt",
      price: 20,
      category: "Clothing",
      variants: [],
    },
    {
      id: "2",
      name: "T-Shirt",
      price: 20,
      category: "Clothing",
      variants: [],
    },
    {
      id: "3",
      name: "Hoodie",
      price: 50,
      category: "Clothing",
      variants: [],
    },
    {
      id: "4",
      name: "Shoes",
      price: 80,
      category: "Footwear",
      variants: [],
    },
    {
      id: "5",
      name: "Shoes",
      price: 80,
      category: "Footwear",
      variants: [],
    },
  ];

  it("removes duplicate products based on name, price, and category", () => {
    const result = removeProductDuplicates(mockProducts);

    expect(result).toHaveLength(3);

    expect(result).toEqual([
      {
        id: "1",
        name: "T-Shirt",
        price: 20,
        category: "Clothing",
        variants: [],
      },
      {
        id: "3",
        name: "Hoodie",
        price: 50,
        category: "Clothing",
        variants: [],
      },
      {
        id: "4",
        name: "Shoes",
        price: 80,
        category: "Footwear",
        variants: [],
      },
    ]);
  });

  it("returns empty array when input is empty", () => {
    expect(removeProductDuplicates([])).toEqual([]);
  });

  it("returns same array when no duplicates exist", () => {
    const unique: Product[] = [
      {
        id: "1",
        name: "Hat",
        price: 10,
        category: "Accessories",
        variants: [],
      },
    ];

    expect(removeProductDuplicates(unique)).toEqual(unique);
  });
});