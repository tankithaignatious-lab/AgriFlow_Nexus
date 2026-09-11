import { useEffect, useMemo, useState } from 'react';
import { Edit3, MapPin, Plus, Search, Trash2, Upload } from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

const storageKey = 'agriflow-farmer-produce';
const categories = ['Vegetable', 'Leafy Green', 'Root Vegetable', 'Spice'];
const availabilityOptions = ['Available', 'Low Stock', 'Sold Out'];

const seedProduce = [
  { id: 1, name: 'Tomato', category: 'Vegetable', quantity: 800, price: 28, location: 'Kallakurichi', availability: 'Available', image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=640&q=80' },
  { id: 2, name: 'Potato', category: 'Root Vegetable', quantity: 1200, price: 32, location: 'Coimbatore', availability: 'Available', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=640&q=80' },
  { id: 3, name: 'Onion', category: 'Root Vegetable', quantity: 600, price: 26, location: 'Salem', availability: 'Low Stock', image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=640&q=80' },
  { id: 4, name: 'Carrot', category: 'Root Vegetable', quantity: 450, price: 38, location: 'Erode', availability: 'Available', image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=640&q=80' },
  { id: 5, name: 'Cabbage', category: 'Vegetable', quantity: 0, price: 24, location: 'Namakkal', availability: 'Sold Out', image: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=640&q=80' },
  { id: 6, name: 'Spinach', category: 'Leafy Green', quantity: 180, price: 30, location: 'Salem', availability: 'Low Stock', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=640&q=80' },
  { id: 7, name: 'Brinjal', category: 'Vegetable', quantity: 520, price: 34, location: 'Madurai', availability: 'Available', image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=640&q=80' },
  { id: 8, name: 'Green Chilli', category: 'Spice', quantity: 260, price: 56, location: 'Dindigul', availability: 'Available', image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=640&q=80' },
];

const blankForm = { name: '', category: 'Vegetable', quantity: '', price: '', location: '', availability: 'Available', image: '' };

const FarmerProducePage = () => {
  const [products, setProducts] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey)) || seedProduce; } catch { return seedProduce; }
  });
  const [filters, setFilters] = useState({ search: '', category: '', availability: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(blankForm);

  useEffect(() => { localStorage.setItem(storageKey, JSON.stringify(products)); }, [products]);

  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase());
    return matchesSearch && (!filters.category || product.category === filters.category) && (!filters.availability || product.availability === filters.availability);
  }), [filters, products]);

  const openAddModal = () => { setEditingProduct(null); setForm(blankForm); setIsModalOpen(true); };
  const openEditModal = (product) => { setEditingProduct(product); setForm({ ...product, quantity: String(product.quantity), price: String(product.price) }); setIsModalOpen(true); };
  const handleFormChange = (event) => { const { name, value } = event.target; setForm((current) => ({ ...current, [name]: value })); };
  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((current) => ({ ...current, image: reader.result }));
    reader.readAsDataURL(file);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const nextProduct = { ...form, id: editingProduct?.id || Date.now(), quantity: Number(form.quantity), price: Number(form.price), image: form.image || editingProduct?.image || seedProduce[0].image };
    setProducts((current) => editingProduct ? current.map((product) => product.id === editingProduct.id ? nextProduct : product) : [nextProduct, ...current]);
    setIsModalOpen(false);
  };
  const handleDelete = (product) => {
    if (window.confirm(`Delete ${product.name} from your produce catalogue?`)) setProducts((current) => current.filter((item) => item.id !== product.id));
  };

  return (
    <DashboardLayout role="farmer" title="My Products">
      <section className="content-panel produce-catalogue">
        <div className="catalogue-heading"><div><h3>Produce Catalogue</h3><p className="muted-text">Manage your listings and keep buyers informed about your available harvest.</p></div><Button onClick={openAddModal}><Plus size={17} /> Add Produce</Button></div>
        <div className="produce-filters" role="search">
          <label className="produce-search"><Search size={18} aria-hidden="true" /><input aria-label="Search produce" placeholder="Search by vegetable name" value={filters.search} onChange={(event) => setFilters({ ...filters, search: event.target.value })} /></label>
          <select aria-label="Filter by category" value={filters.category} onChange={(event) => setFilters({ ...filters, category: event.target.value })}><option value="">All categories</option>{categories.map((category) => <option key={category} value={category}>{category}</option>)}</select>
          <select aria-label="Filter by availability" value={filters.availability} onChange={(event) => setFilters({ ...filters, availability: event.target.value })}><option value="">All availability</option>{availabilityOptions.map((status) => <option key={status} value={status}>{status}</option>)}</select>
        </div>
        {filteredProducts.length ? <div className="produce-grid">{filteredProducts.map((product) => <article className="produce-card" key={product.id}>
          <div className="produce-card__image-wrap"><img src={product.image} alt={product.name} className="produce-card__image" /><span className={`availability-badge availability-badge--${product.availability.toLowerCase().replace(' ', '-')}`}>{product.availability}</span></div>
          <div className="produce-card__body"><div className="produce-card__title"><div><h4>{product.name}</h4><span>{product.category}</span></div><strong>₹{product.price}<small>/kg</small></strong></div><div className="produce-card__details"><span><strong>{product.quantity.toLocaleString()} kg</strong> available</span><span><MapPin size={15} /> {product.location}</span></div><div className="produce-card__actions"><Button variant="secondary" onClick={() => openEditModal(product)}><Edit3 size={15} /> Edit</Button><Button variant="ghost" onClick={() => handleDelete(product)}><Trash2 size={15} /> Delete</Button></div></div>
        </article>)}</div> : <div className="empty-state produce-empty"><span className="produce-empty__icon"><Search size={24} /></span><strong>No produce added yet.</strong><span>Start selling by adding your first produce.</span><Button onClick={openAddModal}><Plus size={17} /> Add Produce</Button></div>}
      </section>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingProduct ? 'Edit Produce' : 'Add Produce'}><form className="produce-form" onSubmit={handleSubmit}>
        <label>Vegetable name<input required name="name" value={form.name} onChange={handleFormChange} placeholder="e.g. Tomato" /></label>
        <div className="produce-form__row"><label>Category<select name="category" value={form.category} onChange={handleFormChange}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label><label>Availability<select name="availability" value={form.availability} onChange={handleFormChange}>{availabilityOptions.map((status) => <option key={status}>{status}</option>)}</select></label></div>
        <div className="produce-form__row"><label>Quantity (kg)<input required min="0" type="number" name="quantity" value={form.quantity} onChange={handleFormChange} placeholder="0" /></label><label>Price per kg (₹)<input required min="0" type="number" name="price" value={form.price} onChange={handleFormChange} placeholder="0" /></label></div>
        <label>Location<input required name="location" value={form.location} onChange={handleFormChange} placeholder="e.g. Salem" /></label>
        <label className="image-upload">Vegetable image<input type="file" accept="image/*" onChange={handleImageChange} /><span><Upload size={17} /> {form.image ? 'Image selected' : 'Choose an image'}</span></label>
        <div className="produce-form__actions"><Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button><Button type="submit"><Plus size={17} /> {editingProduct ? 'Save Changes' : 'Add Produce'}</Button></div>
      </form></Modal>
    </DashboardLayout>
  );
};

export default FarmerProducePage;
