import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import type { Product } from '../types';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products'); // Adjust the API endpoint as needed
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
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

    const onAddToCart = (product: Product) => {
        // TODO: Implement add to cart logic (dispatch action, etc.)
        console.log('Add to cart:', product);
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

    return (
        <div>
            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ marginBottom: 16, padding: 8, width: '100%' }}
            />
            <div className="product-list">
                {filteredProducts.map(product => (
                    <ProductItem key={product.id} product={product} onAddToCart={onAddToCart} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;