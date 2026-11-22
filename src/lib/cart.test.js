import { describe, it, expect } from 'vitest';
import {
  addToCart, setQty, removeFromCart, cartCount, cartSubtotal,
  shippingFee, cartTotal, formatEGP,
} from './cart.js';

const coffee = { id: 'p1', name: 'Coffee', price: 240 };
const dates = { id: 'p2', name: 'Dates', price: 180 };

describe('cart', () => {
  it('adds a new line then merges quantities', () => {
    let cart = addToCart([], coffee);
    cart = addToCart(cart, coffee, 2);
    expect(cart).toHaveLength(1);
    expect(cart[0].qty).toBe(3);
  });

  it('setQty updates and removes at zero', () => {
    let cart = addToCart([], coffee);
    cart = setQty(cart, 'p1', 5);
    expect(cart[0].qty).toBe(5);
    cart = setQty(cart, 'p1', 0);
    expect(cart).toHaveLength(0);
  });

  it('removes lines', () => {
    let cart = addToCart([], coffee);
    cart = addToCart(cart, dates);
    cart = removeFromCart(cart, 'p1');
    expect(cart.map((l) => l.id)).toEqual(['p2']);
  });

  it('counts and totals', () => {
    let cart = addToCart([], coffee, 2); // 480
    cart = addToCart(cart, dates, 1); // 180
    expect(cartCount(cart)).toBe(3);
    expect(cartSubtotal(cart)).toBe(660);
  });

  it('shipping is free over 1500 EGP and for an empty cart', () => {
    expect(shippingFee(0)).toBe(0);
    expect(shippingFee(660)).toBe(60);
    expect(shippingFee(1500)).toBe(0);
    expect(shippingFee(2000)).toBe(0);
  });

  it('cartTotal includes shipping', () => {
    const cart = addToCart([], coffee, 2);
    expect(cartTotal(cart)).toBe(540); // 480 + 60
  });

  it('formats EGP', () => {
    expect(formatEGP(1500)).toMatch(/1,500 EGP/);
  });
});
