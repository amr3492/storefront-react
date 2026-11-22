import { useState } from 'react';
import { cartTotal, formatEGP } from '../lib/cart.js';

const initial = { name: '', email: '', phone: '', address: '', city: '' };

export default function Checkout({ cart, onClose, onDone }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [orderId, setOrderId] = useState(null);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function validate() {
    const errs = {};
    if (form.name.trim().length < 2) errs.name = 'Please enter your full name.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = 'Enter a valid email.';
    if (!/^[0-9+\s-]{8,}$/.test(form.phone)) errs.phone = 'Enter a valid phone number.';
    if (form.address.trim().length < 8) errs.address = 'Enter a full delivery address.';
    if (!form.city.trim()) errs.city = 'City is required.';
    return errs;
  }

  function submit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      // Demo checkout: no payment is processed.
      setOrderId(`SQ-${Date.now().toString(36).toUpperCase()}`);
    }
  }

  if (orderId) {
    return (
      <>
        <div className="overlay" onClick={() => onDone()} />
        <aside className="drawer" aria-label="Order confirmation">
          <div className="confirm">
            <div className="tick">✅</div>
            <h2>Order placed</h2>
            <p>Order <strong>{orderId}</strong> is confirmed.<br />
              A confirmation email is on its way to {form.email}.</p>
            <button className="checkout-btn" onClick={onDone}>Back to the store</button>
          </div>
        </aside>
      </>
    );
  }

  return (
    <>
      <div className="overlay" onClick={onClose} />
      <aside className="drawer" aria-label="Checkout">
        <header>
          <h2>Checkout - {formatEGP(cartTotal(cart))}</h2>
          <button className="close-btn" onClick={onClose} aria-label="Back to cart">×</button>
        </header>
        <form className="checkout-form" onSubmit={submit} noValidate>
          <label>
            Full name
            <input value={form.name} onChange={set('name')} autoComplete="name" />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </label>
          <label>
            Email
            <input type="email" value={form.email} onChange={set('email')} autoComplete="email" />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </label>
          <label>
            Phone
            <input type="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" placeholder="01xxxxxxxxx" />
            {errors.phone && <span className="field-error">{errors.phone}</span>}
          </label>
          <label>
            Delivery address
            <textarea rows="2" value={form.address} onChange={set('address')} autoComplete="street-address" />
            {errors.address && <span className="field-error">{errors.address}</span>}
          </label>
          <label>
            City
            <input value={form.city} onChange={set('city')} autoComplete="address-level2" />
            {errors.city && <span className="field-error">{errors.city}</span>}
          </label>
          <button className="checkout-btn" type="submit">Place order (demo)</button>
        </form>
      </aside>
    </>
  );
}
