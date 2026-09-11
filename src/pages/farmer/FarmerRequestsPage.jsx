import { useMemo, useState } from 'react';
import { CalendarDays, ChevronDown, Eye, MapPin, PackageCheck, Search, Send } from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

const buyerRequests = [
  {
    id: 1,
    buyer: 'Green Mart',
    product: 'Tomato',
    category: 'Vegetables',
    quantity: 500,
    location: 'Coimbatore',
    requestDate: '11 September 2026',
    deliveryDate: '15 September 2026',
    expectedPrice: 35,
    status: 'Open',
  },
  {
    id: 2,
    buyer: 'Fresh Basket',
    product: 'Onion',
    category: 'Vegetables',
    quantity: 1000,
    location: 'Tiruppur',
    requestDate: '11 September 2026',
    deliveryDate: '18 September 2026',
    expectedPrice: 40,
    status: 'Open',
  },
  {
    id: 3,
    buyer: 'City Supermarket',
    product: 'Potato',
    category: 'Vegetables',
    quantity: 750,
    location: 'Coimbatore',
    requestDate: '10 September 2026',
    deliveryDate: '16 September 2026',
    expectedPrice: 32,
    status: 'Pending',
  },
];

const blankOffer = { quantity: '', price: '', location: '', message: '' };

const FarmerRequestsPage = () => {
  const [filters, setFilters] = useState({ search: '', category: '', location: '', status: '', sort: 'newest' });
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [offerRequest, setOfferRequest] = useState(null);
  const [offer, setOffer] = useState(blankOffer);
  const [successMessage, setSuccessMessage] = useState('');

  const categories = [...new Set(buyerRequests.map((request) => request.category))];
  const locations = [...new Set(buyerRequests.map((request) => request.location))];

  const visibleRequests = useMemo(() => {
    const search = filters.search.toLowerCase();
    const filtered = buyerRequests.filter((request) => {
      const matchesSearch = [request.buyer, request.product, request.location].some((value) => value.toLowerCase().includes(search));
      return matchesSearch
        && (!filters.category || request.category === filters.category)
        && (!filters.location || request.location === filters.location)
        && (!filters.status || request.status === filters.status);
    });

    return [...filtered].sort((first, second) => {
      if (filters.sort === 'quantity') return second.quantity - first.quantity;
      if (filters.sort === 'delivery') return new Date(first.deliveryDate) - new Date(second.deliveryDate);
      return new Date(second.requestDate) - new Date(first.requestDate);
    });
  }, [filters]);

  const openOffer = (request) => {
    setOfferRequest(request);
    setOffer(blankOffer);
    setSelectedRequest(null);
    setSuccessMessage('');
  };

  const handleOfferChange = (event) => {
    const { name, value } = event.target;
    setOffer((current) => ({ ...current, [name]: value }));
  };

  const handleOfferSubmit = (event) => {
    event.preventDefault();
    setOfferRequest(null);
    setOffer(blankOffer);
    setSuccessMessage('Your offer has been sent to the buyer successfully.');
  };

  const updateFilter = (name, value) => setFilters((current) => ({ ...current, [name]: value }));

  return (
    <DashboardLayout role="farmer" title="Buyer Requests">
      <section className="content-panel buyer-requests-page">
        <div className="catalogue-heading">
          <div>
            <h3>Buyer Requests</h3>
            <p className="muted-text">Review buyer requirements and send an offer for produce you can supply.</p>
          </div>
          <span className="pill-tag"><PackageCheck size={15} /> {visibleRequests.length} requests</span>
        </div>

        {successMessage && <div className="request-success" role="status">{successMessage}</div>}

        <div className="request-filters" role="search">
          <label className="produce-search"><Search size={18} aria-hidden="true" /><input aria-label="Search buyer requests" placeholder="Search buyer, product or location" value={filters.search} onChange={(event) => updateFilter('search', event.target.value)} /></label>
          <label className="request-select"><span className="sr-only">Product category</span><select aria-label="Filter by product category" value={filters.category} onChange={(event) => updateFilter('category', event.target.value)}><option value="">All categories</option>{categories.map((category) => <option key={category}>{category}</option>)}</select><ChevronDown size={16} /></label>
          <label className="request-select"><span className="sr-only">Location</span><select aria-label="Filter by location" value={filters.location} onChange={(event) => updateFilter('location', event.target.value)}><option value="">All locations</option>{locations.map((location) => <option key={location}>{location}</option>)}</select><ChevronDown size={16} /></label>
          <label className="request-select"><span className="sr-only">Request status</span><select aria-label="Filter by request status" value={filters.status} onChange={(event) => updateFilter('status', event.target.value)}><option value="">All statuses</option>{['Open', 'Pending', 'Fulfilled', 'Expired'].map((status) => <option key={status}>{status}</option>)}</select><ChevronDown size={16} /></label>
          <label className="request-select"><span className="sr-only">Sort requests</span><select aria-label="Sort requests" value={filters.sort} onChange={(event) => updateFilter('sort', event.target.value)}><option value="newest">Newest requests</option><option value="quantity">Required quantity</option><option value="delivery">Delivery date</option></select><ChevronDown size={16} /></label>
        </div>

        {visibleRequests.length ? <div className="request-grid">{visibleRequests.map((request) => (
          <article className="request-card" key={request.id}>
            <div className="request-card__header">
              <div><span className="eyebrow">Buyer</span><h4>{request.buyer}</h4></div>
              <span className={`request-status request-status--${request.status.toLowerCase()}`}>{request.status}</span>
            </div>
            <div className="request-card__product"><div className="request-product-icon"><PackageCheck size={21} /></div><div><h5>{request.product}</h5><span>{request.category}</span></div></div>
            <div className="request-details">
              <div><span>Required quantity</span><strong>{request.quantity.toLocaleString()} KG</strong></div>
              <div><span>Expected price</span><strong>{request.expectedPrice ? `₹${request.expectedPrice}/KG` : 'Not provided'}</strong></div>
              <div><span>Delivery location</span><strong><MapPin size={14} /> {request.location}</strong></div>
              <div><span>Delivery date</span><strong><CalendarDays size={14} /> {request.deliveryDate}</strong></div>
            </div>
            <div className="request-card__footer"><span className="request-date">Requested {request.requestDate}</span><div><Button variant="ghost" onClick={() => setSelectedRequest(request)}><Eye size={15} /> View Details</Button><Button onClick={() => openOffer(request)}><Send size={15} /> Send Offer</Button></div></div>
          </article>
        ))}</div> : <div className="empty-state request-empty"><span className="produce-empty__icon"><Search size={24} /></span><strong>No buyer requests available at the moment.</strong></div>}
      </section>

      <Modal isOpen={Boolean(selectedRequest)} onClose={() => setSelectedRequest(null)} title="Buyer Request Details">
        {selectedRequest && <div className="request-modal-content"><div className="request-modal-title"><div><span className="eyebrow">Buyer</span><h3>{selectedRequest.buyer}</h3></div><span className={`request-status request-status--${selectedRequest.status.toLowerCase()}`}>{selectedRequest.status}</span></div><div className="request-detail-list"><div><span>Product</span><strong>{selectedRequest.product}</strong></div><div><span>Category</span><strong>{selectedRequest.category}</strong></div><div><span>Required quantity</span><strong>{selectedRequest.quantity.toLocaleString()} KG</strong></div><div><span>Delivery location</span><strong>{selectedRequest.location}</strong></div><div><span>Request date</span><strong>{selectedRequest.requestDate}</strong></div><div><span>Required delivery date</span><strong>{selectedRequest.deliveryDate}</strong></div><div><span>Expected price per KG</span><strong>{selectedRequest.expectedPrice ? `₹${selectedRequest.expectedPrice}/KG` : 'Not provided'}</strong></div></div><Button onClick={() => openOffer(selectedRequest)}><Send size={16} /> I'm Interested / Send Offer</Button></div>}
      </Modal>

      <Modal isOpen={Boolean(offerRequest)} onClose={() => setOfferRequest(null)} title={`Send Offer to ${offerRequest?.buyer || ''}`}>
        {offerRequest && <form className="request-offer-form" onSubmit={handleOfferSubmit}><p className="muted-text">Offer to supply {offerRequest.quantity.toLocaleString()} KG of {offerRequest.product} for delivery to {offerRequest.location}.</p><label>Available quantity (KG)<input required min="1" type="number" name="quantity" value={offer.quantity} onChange={handleOfferChange} placeholder="e.g. 500" /></label><label>Farmer's price per KG<input required min="0" type="number" name="price" value={offer.price} onChange={handleOfferChange} placeholder="e.g. 34" /></label><label>Pickup/Delivery location<input required name="location" value={offer.location} onChange={handleOfferChange} placeholder="e.g. Coimbatore Farm Gate" /></label><label>Additional message<textarea name="message" value={offer.message} onChange={handleOfferChange} rows="3" placeholder="Share any details about your produce or delivery..." /></label><div className="produce-form__actions"><Button variant="ghost" onClick={() => setOfferRequest(null)}>Cancel</Button><Button type="submit"><Send size={16} /> Submit Offer</Button></div></form>}
      </Modal>
    </DashboardLayout>
  );
};

export default FarmerRequestsPage;