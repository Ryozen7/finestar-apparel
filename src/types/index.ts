// UI/Component Props
export interface ProductModalProps {
  product: Product;
  open: boolean;
  onClose: () => void;
  onAdd: (variant: ProductVariant) => void;
  loading: boolean;
}

export interface ProductItemProps {
  product: Product;
  onAddToCart: (product: Product, variant: ProductVariant) => void;
}

export interface CartItemProps {
  item: CartItem;
  onRemove: (
    productId: string,
    variant: { size: string; color: string },
  ) => void;
  onQuantityChange: (
    productId: string,
    variant: { size: string; color: string },
    quantity: number,
  ) => void;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  children: React.ReactNode;
  loading?: boolean;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
}

// Redux State Types
export interface MenuItem {
  id: string;
  name: string;
  path: string;
}

export interface MenuState {
  items: MenuItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface ThemeState {
  darkMode: boolean;
}

export interface CartState {
  items: CartItem[];
}

export interface ProductsState {
  items: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
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
