export interface ProductVariant {
    size: string;
    color: string;
}

export interface Product {
    id: string;
    name: string;
    price: number;
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
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface CheckoutDetails {
    items: CartItem[];
    totalAmount: number;
    discountApplied: number;
    finalAmount: number;
}