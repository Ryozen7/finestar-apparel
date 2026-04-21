import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import type { Product } from '../types';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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

    return (
        <div className="product-list">
            {products.map(product => (
                <ProductItem key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
        </div>
    );
};

export default ProductList;