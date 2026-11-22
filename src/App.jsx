import { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import Filters from './components/Filters.jsx';
import ProductCard from './components/ProductCard.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import Checkout from './components/Checkout.jsx';
import { PRODUCTS } from './data/products.js';
import { addToCart } from './lib/cart.js';

export default function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('featured');
  const [view, setView] = useState('shop'); // shop | cart | checkout

  const visible = useMemo(() => {
    let list = PRODUCTS.filter(
      (p) =>
        (category === 'All' || p.category === category) &&
        p.name.toLowerCase().includes(search.trim().toLowerCase())
    );
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [search, category, sort]);

  return (
    <>
      <Header cart={cart} search={search} onSearch={setSearch} onOpenCart={() => setView('cart')} />
      <main className="layout">
        <Filters category={category} onCategory={setCategory} sort={sort} onSort={setSort} />
        {visible.length === 0 ? (
          <p className="empty">Nothing matches "{search}" - try another search.</p>
        ) : (
          <div className="grid">
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={(prod) => setCart((c) => addToCart(c, prod))} />
            ))}
          </div>
        )}
      </main>

      {view === 'cart' && (
        <CartDrawer
          cart={cart}
          setCart={setCart}
          onClose={() => setView('shop')}
          onCheckout={() => setView('checkout')}
        />
      )}
      {view === 'checkout' && (
        <Checkout
          cart={cart}
          onClose={() => setView('cart')}
          onDone={() => {
            setCart([]);
            setView('shop');
          }}
        />
      )}
    </>
  );
}
