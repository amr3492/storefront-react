import { cartCount } from '../lib/cart.js';

export default function Header({ cart, search, onSearch, onOpenCart }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">Souq<span>.</span></div>
        <input
          className="search"
          type="search"
          placeholder="Search coffee, spices, gifts..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          aria-label="Search products"
        />
        <button className="cart-btn" onClick={onOpenCart}>
          Cart ({cartCount(cart)})
        </button>
      </div>
    </header>
  );
}
