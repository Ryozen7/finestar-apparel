export const applyDiscount = (total: number, discountCode: string): number => {
    const discounts: { [key: string]: number } = {
        'SAVE10': 0.10,
        'SAVE20': 0.20,
        'FREESHIP': 0.00 // Free shipping, no discount on total
    };

    const discount = discounts[discountCode.toUpperCase()] || 0;
    return total - (total * discount);
};

export const calculateTotalWithDiscount = (items: { price: number; quantity: number }[], discountCode: string): number => {
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return applyDiscount(subtotal, discountCode);
};