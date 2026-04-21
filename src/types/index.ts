export interface ProductVariant {
    size: string;
    color: string;
    price: number;
}

export interface Product {
    id: string;
    name: string;
    price: number; // default price (smallest variant)
    category: string;
    variants: ProductVariant[];
    image?: string;
}

export interface CartItem {
    productId: string;
    variant: ProductVariant;
    quantity: number;
    product: Product;
}
export interface CheckoutDetails {
    items: CartItem[];
    totalAmount: number;
    discountApplied: number;
    finalAmount: number;
}