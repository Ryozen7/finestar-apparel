import React, { useEffect, useState } from "react";
import Input from "./Input";
import ProductItem from "./ProductItem";
import type { Product, ProductVariant } from "../types";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { saveCartThunk, fetchCartThunk } from "../redux/slices/cartSlice";
import { useSelector } from "react-redux";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "price" | "category">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: any) => state.cart.items);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products"); // Adjust the API endpoint as needed
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const onAddToCart = async (product: Product, variant: ProductVariant) => {
    // Clone product and override price with variant price for cart
    const productWithVariantPrice = { ...product, price: variant.price };
    // Check if item exists
    const idx = cartItems.findIndex(
      (item: any) =>
        item.productId === product.id &&
        item.variant.size === variant.size &&
        item.variant.color === variant.color,
    );
    let newCart;
    if (idx !== -1) {
      newCart = cartItems.map((item: any, i: number) =>
        i === idx ? { ...item, quantity: item.quantity + 1 } : item,
      );
    } else {
      newCart = [
        ...cartItems,
        {
          productId: product.id,
          variant,
          quantity: 1,
          product: productWithVariantPrice,
        },
      ];
    }
    await dispatch(saveCartThunk(newCart));
    dispatch(fetchCartThunk());
  };

  // Fuzzy search filter
  const filteredProducts = products.filter((product) => {
    const q = search.toLowerCase();
    return (
      product.name.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q) ||
      product.price.toString().toLowerCase().includes(q)
    );
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let cmp = 0;
    if (sortBy === "name") {
      cmp = a.name.localeCompare(b.name);
    } else if (sortBy === "category") {
      cmp = a.category.localeCompare(b.category);
    } else if (sortBy === "price") {
      cmp = a.price - b.price;
    }
    return sortOrder === "asc" ? cmp : -cmp;
  });

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <Input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1 }}
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          style={{ padding: 8 }}
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="category">Category</option>
        </select>
        <button
          onClick={() =>
            setSortOrder((o: typeof sortOrder) =>
              o === "asc" ? "desc" : "asc",
            )
          }
          style={{ padding: 8 }}
        >
          {sortOrder === "asc" ? "↑" : "↓"}
        </button>
      </div>
      <div className="product-list">
        {sortedProducts.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
