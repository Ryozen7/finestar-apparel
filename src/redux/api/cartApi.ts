// src/redux/api/cartApi.ts
const API_URL = 'https://yourapi.mockapi.io/api/finestar/cart';

export async function fetchCart() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch cart');
  return res.json();
}

export async function saveCart(items) {
  // For simplicity, assume a single cart with id '1'
  const res = await fetch(`${API_URL}/1`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items }),
  });
  if (!res.ok) throw new Error('Failed to save cart');
  return res.json();
}

export async function clearCartApi() {
  // Set items to empty array
  const res = await fetch(`${API_URL}/1`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: [] }),
  });
  if (!res.ok) throw new Error('Failed to clear cart');
  return res.json();
}
