import React, { useEffect, useState, useMemo, useCallback } from "react";
import ProductSearch from "./ProductSearch";
import ProductItem from "./ProductItem";
import type { CartItem, Product, ProductVariant } from "../types";
import "../styles/ProductList.css";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { saveCartThunk, fetchCartThunk } from "../redux/slices/cartSlice";
import { useSelector } from "react-redux";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [sortBy, setSortBy] = useState<"name" | "price" | "category">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: { cart: { items: CartItem[] } }) => state.cart.items);


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

  const onAddToCart = useCallback(async (product: Product, variant: ProductVariant) => {
    // Clone product and override price with variant price for cart
    const productWithVariantPrice = { ...product, price: variant.price };
    // Check if item exists
    const idx = cartItems.findIndex(
      (item: CartItem) =>
        item.productId === product.id &&
        item.variant.size === variant.size &&
        item.variant.color === variant.color,
    );
    let newCart;
    if (idx !== -1) {
      newCart = cartItems.map((item: CartItem, i: number) =>
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
  }, [cartItems, dispatch]);


  // Fuzzy search filter
  const filteredProducts = useMemo(() => {
    const q = search.toLowerCase();
    return products.filter((product) =>
      product.name.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q) ||
      product.price.toString().toLowerCase().includes(q)
    );
  }, [products, search]);

  // Sorting
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
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
  }, [filteredProducts, sortBy, sortOrder]);

  // Debounced search handler for ProductSearch
  const handleSearchChange = useCallback((value: string) => {
    setSearchLoading(true);
    setSearch(value);
    setTimeout(() => setSearchLoading(false), 400);
  }, []);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="product-list-toolbar">
        <ProductSearch value={search} onChange={handleSearchChange} loading={searchLoading} />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="product-list-toolbar-select"
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
          className="product-list-toolbar-button"
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
