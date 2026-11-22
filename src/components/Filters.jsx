import { CATEGORIES } from '../data/products.js';

export default function Filters({ category, onCategory, sort, onSort }) {
  return (
    <div className="filters">
      {CATEGORIES.map((c) => (
        <button
          key={c}
          className={`chip ${category === c ? 'active' : ''}`}
          onClick={() => onCategory(c)}
        >
          {c}
        </button>
      ))}
      <select
        className="sort-select"
        value={sort}
        onChange={(e) => onSort(e.target.value)}
        aria-label="Sort products"
      >
        <option value="featured">Featured</option>
        <option value="price-asc">Price: low to high</option>
        <option value="price-desc">Price: high to low</option>
        <option value="rating">Top rated</option>
      </select>
    </div>
  );
}
