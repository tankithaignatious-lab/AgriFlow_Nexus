import { useMemo, useState } from 'react';
import { Heart, MapPin, Search, ShoppingCart, Star, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import EmptyState from '../../components/EmptyState';
import { useBuyerStore } from '../../hooks/useBuyerStore';

const BuyerProductCard = ({ product, onSelect }) => {
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist } = useBuyerStore();
  const saved = wishlist.some((item) => item.id === product.id);
  return <article className="produce-card buyer-product-card">
    <div className="produce-card__image-wrap"><img src={product.image} alt={product.name} className="produce-card__image" /><span className={`availability-badge availability-badge--${product.availability.toLowerCase().replace(' ', '-')}`}>{product.availability}</span></div>
    <div className="produce-card__body"><div className="produce-card__title"><button className="buyer-product-link" onClick={() => onSelect(product)}><h4>{product.name}</h4><span>{product.category}</span></button><strong>₹{product.price}<small>/kg</small></strong></div>
      <div className="buyer-farmer-line"><span>{product.farmer}</span><span><Star size={13} fill="currentColor" /> {product.rating}</span></div>
      <div className="produce-card__details"><span><strong>{product.quantity.toLocaleString()} kg</strong> available</span><span><MapPin size={15} /> {product.location}</span></div>
      <div className="buyer-price-line"><span>Market Price ₹{product.marketPrice}/kg</span><span>Farmer Price ₹{product.price}/kg</span></div>
      <div className="produce-card__actions"><Button variant="secondary" disabled={product.availability === 'Sold Out'} onClick={() => addToCart(product)}><ShoppingCart size={15} /> Add to Cart</Button><Button variant="ghost" onClick={() => toggleWishlist(product)} aria-label={`${saved ? 'Remove' : 'Add'} ${product.name} wishlist`}><Heart size={15} fill={saved ? 'currentColor' : 'none'} /></Button></div>
      <button className="text-button buyer-view-details" onClick={() => onSelect(product)}>View product details</button>
    </div>
  </article>;
};

const BuyerMarketplacePage = () => {
  const { products } = useBuyerStore();
  const [filters, setFilters] = useState({ search: '', category: '', location: '', availability: '', sort: 'default' });
  const [selected, setSelected] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const categories = [...new Set(products.map((item) => item.category))];
  const filtered = useMemo(() => products.filter((product) => {
    const query = filters.search.toLowerCase();
    const searchable = [product.name, product.farmer, product.location, product.category].join(' ').toLowerCase();
    return searchable.includes(query) && (!filters.category || product.category === filters.category) && (!filters.location || product.location === filters.location) && (!filters.availability || product.availability === filters.availability);
  }).sort((a, b) => filters.sort === 'low' ? a.price - b.price : filters.sort === 'high' ? b.price - a.price : filters.sort === 'rating' ? b.rating - a.rating : filters.sort === 'quantity' ? b.quantity - a.quantity : 0), [filters, products]);
  const { addToCart } = useBuyerStore();
  const openDetails = (product) => { setSelected(product); setQuantity(1); };
  return <DashboardLayout role="buyer" title="Browse Products">
    <section className="content-panel buyer-marketplace"><div className="catalogue-heading"><div><span className="eyebrow">Buyer marketplace</span><h3>Fresh supply from verified farmers</h3><p className="muted-text">Compare farmer prices with the demo market reference before you buy.</p></div><Button variant="secondary" onClick={() => window.location.assign('/buyer/cart')}><ShoppingCart size={16} /> View Cart</Button></div>
      <div className="buyer-filters"><label className="produce-search"><Search size={17} /><input placeholder="Search vegetables, farmers or locations..." value={filters.search} onChange={(event) => setFilters({ ...filters, search: event.target.value })} /></label><select value={filters.category} onChange={(event) => setFilters({ ...filters, category: event.target.value })}><option value="">All categories</option>{categories.map((item) => <option key={item}>{item}</option>)}</select><select value={filters.location} onChange={(event) => setFilters({ ...filters, location: event.target.value })}><option value="">All locations</option>{[...new Set(products.map((item) => item.location))].map((item) => <option key={item}>{item}</option>)}</select><select value={filters.availability} onChange={(event) => setFilters({ ...filters, availability: event.target.value })}><option value="">All availability</option><option>Available</option><option>Low Stock</option></select><select value={filters.sort} onChange={(event) => setFilters({ ...filters, sort: event.target.value })}><option value="default">Sort products</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option><option value="rating">Highest Rated</option><option value="quantity">Most Available</option></select></div>
      <div className="buyer-data-note">Demo catalogue data. Prices are sample values until the farmer product API is connected.</div>
      {filtered.length ? <div className="produce-grid">{filtered.map((product) => <BuyerProductCard key={product.id} product={product} onSelect={openDetails} />)}</div> : <EmptyState title="No products available" message="Try changing your search or filters." />}</section>
      <Modal isOpen={Boolean(selected)} onClose={() => setSelected(null)} title={selected?.name || 'Product details'}>{selected && <div className="buyer-product-detail"><img src={selected.image} alt={selected.name} /><div className="buyer-detail-heading"><div><span className="eyebrow">{selected.category}</span><h3>{selected.name}</h3><p className="muted-text">{selected.farmer} · {selected.farm} · {selected.location}</p></div><span className="score-badge"><Star size={13} fill="currentColor" /> {selected.rating}</span></div><p>{selected.description}</p><div className="buyer-detail-grid"><div><span>Available quantity</span><strong>{selected.quantity} KG</strong></div><div><span>Minimum order</span><strong>5 KG</strong></div><div><span>Farmer price</span><strong>₹{selected.price}/KG</strong></div><div><span>Market reference</span><strong>₹{selected.marketPrice}/KG</strong></div></div><label className="buyer-quantity">Quantity (KG)<input min="1" max={selected.quantity} type="number" value={quantity} onChange={(event) => setQuantity(Math.max(1, Math.min(selected.quantity, Number(event.target.value) || 1)))} /></label><div className="buyer-total"><span>Product total</span><strong>₹{(quantity * selected.price).toLocaleString('en-IN')}</strong></div><div className="produce-form__actions"><Button variant="ghost" onClick={() => setSelected(null)}><X size={16} /> Close</Button><Button onClick={() => { addToCart(selected, quantity); setSelected(null); }}><ShoppingCart size={16} /> Add to Cart</Button></div><small className="muted-text">Last updated {selected.updated}. Market price and farmer price are shown separately.</small></div>}</Modal>
    </DashboardLayout>;
};

export default BuyerMarketplacePage;
