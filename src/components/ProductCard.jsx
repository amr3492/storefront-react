import { formatEGP } from '../lib/cart.js';

function monogram(name) {
  return name
    .replace(/\(.*?\)/g, '')
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

export default function ProductCard({ product, onAdd }) {
  return (
    <article className="card">
      <div
        className="card-img"
        style={{ background: `linear-gradient(135deg, hsl(${product.hue}, 45%, 88%), hsl(${product.hue}, 55%, 72%))` }}
        role="img"
        aria-label={product.name}
      >
        <span className="monogram">{monogram(product.name)}</span>
      </div>
      <div className="card-body">
        <h3>{product.name}</h3>
        <p className="blurb">{product.blurb}</p>
        <div className="meta">
          <span className="price">{formatEGP(product.price)}</span>
          <span className="rating">★ {product.rating}</span>
        </div>
        <button className="add-btn" onClick={() => onAdd(product)}>
          Add to cart
        </button>
      </div>
    </article>
  );
}
