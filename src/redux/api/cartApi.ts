// src/redux/api/cartApi.ts
const API_URL = '/api/cart';


// MOCK: Return a static cart for local development/testing
// Remove/comment this function and uncomment the real fetch for production
export async function fetchCart() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch cart');
  return res.json();
}
// --- Real API call ---
// export async function fetchCart() {
//   const res = await fetch(API_URL);
//   if (!res.ok) throw new Error('Failed to fetch cart');
//   return res.json();
// }


import type { CartItem } from '../../types';

export async function saveCart(items: CartItem[]) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items }),
  });
  if (!res.ok) throw new Error('Failed to save cart');
  return res.json();
}

export async function clearCartApi() {
  const res = await fetch(`${API_URL}/clear`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to clear cart');
  return res.json();
}
