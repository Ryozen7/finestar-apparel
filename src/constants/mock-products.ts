import type { Product } from "../types";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Classic White T-Shirt",
    price: 19.99,
    category: "Tops",
    variants: [
      { size: "S", color: "White", price: 19.99 },
      { size: "M", color: "White", price: 29.99 },
      { size: "L", color: "White", price: 39.99 }
    ],
    image: ""
  },
  {
    id: "2",
    name: "Blue Denim Jeans",
    price: 39.99,
    category: "Bottoms",
    variants: [
      { size: "30", color: "Blue", price: 25.99 },
      { size: "32", color: "Blue", price: 35.99 },
      { size: "34", color: "Blue", price: 38.99 }
    ],
    image: ""
  },
  {
    id: "3",
    name: "Red Hoodie",
    price: 29.99,
    category: "Outerwear",
    variants: [
      { size: "M", color: "Red", price: 29.99 },
      { size: "L", color: "Red", price: 39.99 }
    ],
    image: ""
  },
  {
    id: "4",
    name: "Black Sneakers",
    price: 49.99,
    category: "Footwear",
    variants: [
      { size: "8", color: "Black", price: 42.99 },
      { size: "9", color: "Black", price: 45.99 },
      { size: "10", color: "Black", price: 49.99 }
    ],
    image: ""
  },
  {
    id: "5",
    name: "Green Polo Shirt",
    price: 24.99,
    category: "Tops",
    variants: [
      { size: "S", color: "Green", price: 20.99 },
      { size: "M", color: "Green", price: 24.99 }
    ],
    image: ""
  },
  {
    id: "6",
    name: "Grey Joggers",
    price: 34.99,
    category: "Bottoms",
    variants: [
      { size: "M", color: "Grey", price: 31.99 },
      { size: "L", color: "Grey", price: 34.99 }
    ],
    image: ""
  },
  {
    id: "7",
    name: "Yellow Summer Dress",
    price: 44.99,
    category: "Dresses",
    variants: [
      { size: "S", color: "Yellow", price: 42.99 },
      { size: "M", color: "Yellow", price: 44.99 }
    ],
    image: ""
  },
  {
    id: "8",
    name: "Navy Blue Blazer",
    price: 59.99,
    category: "Outerwear",
    variants: [
      { size: "M", color: "Navy", price: 59.99 },
      { size: "L", color: "Navy", price: 69.99 }
    ],
    image: ""
  }
];
