// Pure cart logic - no React, so it is trivially testable.

export function addToCart(cart, product, qty = 1) {
  const existing = cart.find((line) => line.id === product.id);
  if (existing) {
    return cart.map((line) =>
      line.id === product.id ? { ...line, qty: line.qty + qty } : line
    );
  }
  return [...cart, { id: product.id, name: product.name, price: product.price, qty }];
}

export function setQty(cart, id, qty) {
  if (qty <= 0) return cart.filter((line) => line.id !== id);
  return cart.map((line) => (line.id === id ? { ...line, qty } : line));
}

export function removeFromCart(cart, id) {
  return cart.filter((line) => line.id !== id);
}

export function cartCount(cart) {
  return cart.reduce((sum, line) => sum + line.qty, 0);
}

export function cartSubtotal(cart) {
  return cart.reduce((sum, line) => sum + line.price * line.qty, 0);
}

// Free shipping over 1500 EGP, otherwise 60 EGP. Empty cart ships free (nothing to ship).
export function shippingFee(subtotal) {
  if (subtotal === 0 || subtotal >= 1500) return 0;
  return 60;
}

export function cartTotal(cart) {
  const subtotal = cartSubtotal(cart);
  return subtotal + shippingFee(subtotal);
}

export function formatEGP(amount) {
  return `${amount.toLocaleString('en-EG', { maximumFractionDigits: 0 })} EGP`;
}
