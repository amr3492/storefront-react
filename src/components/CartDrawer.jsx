import { cartSubtotal, shippingFee, cartTotal, formatEGP, setQty, removeFromCart } from '../lib/cart.js';

export default function CartDrawer({ cart, setCart, onClose, onCheckout }) {
  const subtotal = cartSubtotal(cart);
  const shipping = shippingFee(subtotal);
  const total = cartTotal(cart);

  return (
    <>
      <div className="overlay" onClick={onClose} />
      <aside className="drawer" aria-label="Shopping cart">
        <header>
          <h2>Your cart</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close cart">×</button>
        </header>
        <div className="drawer-lines">
          {cart.length === 0 && <p className="empty">Your cart is empty.</p>}
          {cart.map((line) => (
            <div className="line" key={line.id}>
              <div>
                <div className="name">{line.name}</div>
                <div className="unit">{formatEGP(line.price)} each</div>
              </div>
              <div className="qty">
                <button onClick={() => setCart((c) => setQty(c, line.id, line.qty - 1))} aria-label="Decrease">−</button>
                <span>{line.qty}</span>
                <button onClick={() => setCart((c) => setQty(c, line.id, line.qty + 1))} aria-label="Increase">+</button>
              </div>
              <div>{formatEGP(line.price * line.qty)}</div>
              <button className="remove-btn" onClick={() => setCart((c) => removeFromCart(c, line.id))}>
                Remove
              </button>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <footer>
            {shipping > 0 && (
              <p className="free-shipping-note">
                Add {formatEGP(1500 - subtotal)} more for free shipping.
              </p>
            )}
            <div className="totals">
              <div className="row"><span>Subtotal</span><span>{formatEGP(subtotal)}</span></div>
              <div className="row"><span>Shipping</span><span>{shipping === 0 ? 'Free' : formatEGP(shipping)}</span></div>
              <div className="row grand"><span>Total</span><span>{formatEGP(total)}</span></div>
            </div>
            <button className="checkout-btn" onClick={onCheckout}>Checkout</button>
          </footer>
        )}
      </aside>
    </>
  );
}
