import { useMemo, useEffect, useState } from 'react';
import { Check, Eye, MapPin, Minus, Truck } from 'lucide-react';
import L from 'leaflet';
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import DashboardLayout from '../../layouts/DashboardLayout';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import { paymentRecords } from './FarmerPaymentsPage';

const extras = {
  ORD1001: { buyerId: 'BUY1001', address: 'Green Mart Warehouse, Coimbatore', time: '10:30 AM' },
  ORD1002: { buyerId: 'BUY1002', address: 'Fresh Basket Depot, Tiruppur', time: '8:00 AM' },
  ORD1003: { buyerId: 'BUY1003', address: 'City Supermarket, Coimbatore', time: '9:10 AM' },
  ORD1004: { buyerId: 'BUY1004', address: 'Harvest Hub, Erode', time: '9:00 AM' },
  ORD1005: { buyerId: 'BUY1005', address: 'Southside Grocers, Salem', time: '2:00 PM' },
  ORD1006: { buyerId: 'BUY1006', address: 'Daily Needs Market, Salem', time: '8:00 AM' },
  ORD1007: { buyerId: 'BUY1007', address: 'Metro Fresh Foods, Madurai', time: '8:30 AM' },
  ORD1008: { buyerId: 'BUY1004', address: 'Harvest Hub, Erode', time: '8:45 AM' },
};
const coordinates = {
  ORD1001: { pickup: [10.6586, 77.0082], current: [10.9847, 76.9667], destination: [11.0168, 76.9558], pickupName: 'Pollachi', currentName: 'Ukkadam, Coimbatore', destinationName: 'Gandhipuram, Coimbatore' },
  ORD1002: { pickup: [10.6586, 77.0082], current: [10.7201, 77.0093], destination: [11.1085, 77.3411], pickupName: 'Pollachi', currentName: 'Pollachi Packing Hub', destinationName: 'Tiruppur' },
  ORD1003: { pickup: [10.6586, 77.0082], current: [11.0168, 76.9558], destination: [11.0168, 76.9558], pickupName: 'Pollachi', currentName: 'Coimbatore', destinationName: 'Coimbatore' },
  ORD1004: { pickup: [10.6586, 77.0082], current: [11.3410, 77.7172], destination: [11.3410, 77.7172], pickupName: 'Pollachi', currentName: 'Erode', destinationName: 'Erode' },
  ORD1005: { pickup: [10.6586, 77.0082], current: [10.6586, 77.0082], destination: [11.6643, 78.1460], pickupName: 'Pollachi', currentName: 'Pollachi Collection Point', destinationName: 'Salem' },
  ORD1006: { pickup: [10.6586, 77.0082], current: [11.6643, 78.1460], destination: [11.6643, 78.1460], pickupName: 'Pollachi', currentName: 'Salem', destinationName: 'Salem' },
  ORD1007: { pickup: [10.6586, 77.0082], current: [10.3744, 77.9803], destination: [9.9252, 78.1198], pickupName: 'Pollachi', currentName: 'Dindigul Highway Checkpoint', destinationName: 'Madurai' },
  ORD1008: { pickup: [10.6586, 77.0082], current: [10.6586, 77.0082], destination: [11.3410, 77.7172], pickupName: 'Pollachi', currentName: 'Pollachi Collection Point', destinationName: 'Erode' },
};
const statuses = ['Order Placed', 'Confirmed', 'Packed', 'Dispatched', 'In Transit', 'Out for Delivery', 'Delivered', 'Delayed', 'Cancelled'];
const money = (value) => `₹${value.toLocaleString('en-IN')}`;
const date = (value) => value ? new Date(`${value}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '-';
const statusClass = (status) => (status || 'Order Placed').toLowerCase().replaceAll(' ', '-');
const marker = (color, text) => L.divIcon({ className: 'tracking-map-marker', html: `<span style="background:${color}">${text}</span>`, iconSize: [30, 30], iconAnchor: [15, 15] });
const pickupIcon = marker('#1d6f42', 'P');
const vehicleIcon = marker('#d29a2d', 'V');
const destinationIcon = marker('#a14646', 'D');
const interpolate = (a, b, value) => [a[0] + (b[0] - a[0]) * value, a[1] + (b[1] - a[1]) * value];
const distance = (a, b) => { const r = Math.PI / 180; const x = (b[0] - a[0]) * r; const y = (b[1] - a[1]) * r; const q = Math.sin(x / 2) ** 2 + Math.cos(a[0] * r) * Math.cos(b[0] * r) * Math.sin(y / 2) ** 2; return 6371 * 2 * Math.atan2(Math.sqrt(q), Math.sqrt(1 - q)); };
const MapBounds = ({ points }) => { const map = useMap(); useEffect(() => { map.fitBounds(points, { padding: [25, 25] }); }, [map, points]); return null; };
const timelineStages = ['Order Placed', 'Confirmed', 'Packed', 'Dispatched', 'In Transit', 'Out for Delivery', 'Delivered'];
const timelineIndex = (status) => ({ 'Order Placed': 0, Confirmed: 1, Packed: 2, Dispatched: 3, 'In Transit': 4, 'Out for Delivery': 5, Delivered: 6, Delayed: 4, Cancelled: 4 }[status] ?? 0);
const timelineDescription = { 'Order Placed': 'Buyer placed the order.', Confirmed: 'Order was confirmed by the farmer.', Packed: 'Order has been packed and is ready for dispatch.', Dispatched: 'Order has left the pickup location.', 'In Transit': 'Order is currently on the way.', 'Out for Delivery': 'Delivery partner is taking the order to the buyer.', Delivered: 'Order was delivered to the buyer.' };
const fallbackTimeline = (record) => [{ label: 'Order Placed', time: record.orderDate ? `${date(record.orderDate)} · Order time unavailable` : 'Order date unavailable' }];
const normalizeOrder = (record) => {
  const base = { ...record, ...(extras[record?.orderId] || {}) };
  return {
    ...base,
    orderId: base.orderId || 'Order ID unavailable',
    buyer: base.buyer || 'Buyer unavailable',
    buyerId: base.buyerId || 'Buyer ID unavailable',
    contact: base.contact || 'Buyer contact unavailable',
    quantity: Number.isFinite(Number(base.quantity)) ? Number(base.quantity) : 0,
    orderDate: base.orderDate || '',
    time: base.time || 'Order time unavailable',
    pickupLocation: base.pickupLocation || 'Pickup location unavailable',
    location: base.location || 'Delivery location unavailable',
    trackingId: base.trackingId || 'Tracking ID unavailable',
    deliveryPartner: base.deliveryPartner || 'Delivery partner unavailable',
    currentLocation: base.currentLocation || 'Current location unavailable',
    deliveryStatus: base.deliveryStatus || 'Order Placed',
    deliveryDate: base.deliveryDate || '',
    lastUpdated: base.lastUpdated || 'Last updated time unavailable',
    timeline: Array.isArray(base.timeline) && base.timeline.length ? base.timeline : fallbackTimeline(base),
  };
};

const DeliveryTimeline = ({ order }) => {
  const currentIndex = timelineIndex(order.deliveryStatus);
  const eventByLabel = new Map(order.timeline.map((event) => {
    if (typeof event === 'string') return [event, ''];
    return [event.label || event.status, event.time || event.timestamp || ''];
  }));
  return <div className="delivery-timeline delivery-timeline--primary"><h4>Delivery Timeline</h4>{timelineStages.map((stage, index) => { const complete = index < currentIndex || order.deliveryStatus === 'Delivered'; const current = index === currentIndex && order.deliveryStatus !== 'Delivered'; const event = eventByLabel.get(stage); const time = event?.time || (current && stage === 'In Transit' ? `Currently at ${order.currentLocation}` : 'Pending'); const location = event?.location || (current ? order.currentLocation : complete ? order.pickupLocation : ''); return <div className={`timeline-step ${current ? 'timeline-step--current' : ''} ${complete ? 'timeline-step--complete' : ''}`} key={stage}><span className="timeline-marker">{complete ? <Check size={14} /> : current ? <Truck size={14} /> : null}</span><div><strong>{stage}</strong><span>{time}</span>{location && <small>Location: {location}</small>}<small>{timelineDescription[stage]}</small></div></div>; })}</div>;
};

const TrackingMapBase = ({ order }) => {
  const route = coordinates[order.orderId];
  if (!route) return <div className="tracking-location-unavailable"><strong>Location unavailable</strong><span>Live GPS location has not been provided yet.</span></div>;
  const [progress, setProgress] = useState(order.deliveryStatus === 'Delivered' ? 1 : 0.72);
  useEffect(() => { if (['Delivered', 'Cancelled'].includes(order.deliveryStatus)) return undefined; const timer = setInterval(() => setProgress((value) => value >= 0.96 ? 0.2 : value + 0.015), 3000); return () => clearInterval(timer); }, [order.deliveryStatus]);
  const current = order.deliveryStatus === 'Delivered' ? route.destination : interpolate(route.pickup, route.destination, progress);
  const remaining = distance(current, route.destination);
  const eta = Math.max(5, Math.round(remaining / 0.45));
  return <div className="live-tracking-map-wrap"><div className="live-tracking-map"><MapContainer center={current} zoom={11} scrollWheelZoom><TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /><MapBounds points={[route.pickup, current, route.destination]} /><Polyline positions={[route.pickup, current, route.destination]} pathOptions={{ color: '#1d6f42', weight: 5 }} /><Marker position={route.pickup} icon={pickupIcon}><Popup>Pickup: {route.pickupName}</Popup></Marker><Marker position={current} icon={vehicleIcon}><Popup>Demo Live Location: {route.currentName}</Popup></Marker><Marker position={route.destination} icon={destinationIcon}><Popup>Destination: {route.destinationName}</Popup></Marker></MapContainer></div><div className="tracking-map-legend"><span>Pickup</span><span>Current vehicle</span><span>Destination</span><strong>Demo Live Location</strong></div><div className="tracking-map-metrics"><div><span>Current Location</span><strong>{route.currentName}</strong></div><div><span>Distance Remaining</span><strong>{remaining.toFixed(1)} KM</strong></div><div><span>Estimated Arrival</span><strong>{order.deliveryStatus === 'Delivered' ? 'Delivered' : `${eta} minutes`}</strong></div><div><span>Last Updated</span><strong>{order.deliveryStatus === 'Delivered' ? order.deliveredOn : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong></div></div></div>;
};

const TrackingMap = ({ order }) => <><TrackingMapBase order={order} /><DeliveryTimeline order={order} /></>;

const FarmerDeliveryPage = () => {
  const [filters, setFilters] = useState({ search: '', status: '', location: '', orderDate: '', sort: 'newest' });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const orders = paymentRecords.map(normalizeOrder);
  const locations = [...new Set(orders.map((order) => order.location))];
  const filtered = useMemo(() => orders.filter((order) => { const query = filters.search.toLowerCase(); return [order.buyer, order.orderId, order.trackingId, order.location].join(' ').toLowerCase().includes(query) && (!filters.status || order.deliveryStatus === filters.status) && (!filters.location || order.location === filters.location) && (!filters.orderDate || order.orderDate === filters.orderDate); }).sort((a, b) => filters.sort === 'oldest' ? new Date(a.orderDate) - new Date(b.orderDate) : filters.sort === 'quantity' ? b.quantity - a.quantity : filters.sort === 'delivery' ? new Date(a.deliveryDate) - new Date(b.deliveryDate) : filters.sort === 'amount' ? b.orderAmount - a.orderAmount : new Date(b.orderDate) - new Date(a.orderDate)), [filters]);
  const summary = { total: orders.length, yet: orders.filter((order) => ['Order Placed', 'Confirmed', 'Packed'].includes(order.deliveryStatus)).length, transit: orders.filter((order) => order.deliveryStatus === 'In Transit').length, out: orders.filter((order) => order.deliveryStatus === 'Out for Delivery').length, delivered: orders.filter((order) => order.deliveryStatus === 'Delivered').length, delayed: orders.filter((order) => order.deliveryStatus === 'Delayed').length };
  const setFilter = (name, value) => setFilters((current) => ({ ...current, [name]: value }));
  const icon = (status) => status === 'Delivered' ? <Check size={14} /> : status === 'Delayed' || status === 'Cancelled' ? <Minus size={14} /> : <Truck size={14} />;

  return <DashboardLayout role="farmer" title="Delivery"><div className="delivery-page"><section className="stats-grid delivery-summary-cards">{[['Total Orders', summary.total], ['Orders Yet to Dispatch', summary.yet], ['Orders In Transit', summary.transit], ['Out for Delivery', summary.out], ['Delivered', summary.delivered], ['Delayed', summary.delayed]].map(([label, value]) => <div className="stat-card" key={label}><div className="stat-card__header"><span className="stat-card__dot stat-card__dot--green" />{label}</div><div className="stat-card__value">{value}</div></div>)}</section><section className="section-block delivery-table-section"><div className="section-header"><div><h3>Order Delivery Tracking</h3><p className="muted-text">Demo Live Location is simulated for this delivery prototype.</p></div><span className="pill-tag">Demo Data</span></div><div className="delivery-filters"><label className="produce-search"><input placeholder="Search buyer, order, tracking ID or location" value={filters.search} onChange={(event) => setFilter('search', event.target.value)} /></label><select value={filters.status} onChange={(event) => setFilter('status', event.target.value)}><option value="">All delivery statuses</option>{statuses.map((status) => <option key={status}>{status}</option>)}</select><select value={filters.location} onChange={(event) => setFilter('location', event.target.value)}><option value="">All locations</option>{locations.map((location) => <option key={location}>{location}</option>)}</select><input type="date" value={filters.orderDate} onChange={(event) => setFilter('orderDate', event.target.value)} /><select value={filters.sort} onChange={(event) => setFilter('sort', event.target.value)}><option value="newest">Newest orders</option><option value="oldest">Oldest orders</option><option value="amount">Highest order amount</option><option value="quantity">Largest quantity</option><option value="delivery">Earliest delivery date</option></select></div><div className="table-wrap"><table className="data-table delivery-table"><thead><tr><th>Order ID</th><th>Buyer Name</th><th>Quantity</th><th>Order Date</th><th>Delivery Location</th><th>Delivery Status</th><th>Expected Delivery</th><th>Tracking ID</th><th>Action</th></tr></thead><tbody>{filtered.map((order) => <tr key={order.orderId}><td><strong>{order.orderId}</strong></td><td><strong>{order.buyer}</strong><span>{order.buyerId}</span></td><td>{order.quantity.toLocaleString()} KG</td><td>{date(order.orderDate)}<small>{order.time}</small></td><td><MapPin size={14} /> {order.location}</td><td><span className={`delivery-status delivery-status--${statusClass(order.deliveryStatus)}`}>{icon(order.deliveryStatus)} {order.deliveryStatus}</span></td><td>{date(order.deliveryDate)}</td><td>{order.trackingId}</td><td><Button variant="ghost" onClick={() => setSelectedOrder(order)}><Eye size={15} /> Track Order</Button></td></tr>)}</tbody></table></div></section><Modal isOpen={Boolean(selectedOrder)} onClose={() => setSelectedOrder(null)} title="Track Order">{selectedOrder && <div className="order-details-modal"><div className="order-detail-heading"><div><span className="eyebrow">{selectedOrder.orderId}</span><h3>{selectedOrder.buyer}</h3><span className="muted-text">{selectedOrder.buyerId} · {selectedOrder.contact}</span></div><span className={`delivery-status delivery-status--${statusClass(selectedOrder.deliveryStatus)}`}>{icon(selectedOrder.deliveryStatus)} {selectedOrder.deliveryStatus}</span></div><TrackingMap order={selectedOrder} /><div className="order-detail-grid"><div><span>Order ID</span><strong>{selectedOrder.orderId}</strong></div><div><span>Buyer Name</span><strong>{selectedOrder.buyer}</strong></div><div><span>Buyer Contact</span><strong>{selectedOrder.contact}</strong></div><div><span>Quantity Ordered</span><strong>{selectedOrder.quantity.toLocaleString()} KG</strong></div><div><span>Order Date & Time</span><strong>{date(selectedOrder.orderDate)} · {selectedOrder.time}</strong></div><div><span>Pickup Location</span><strong>{coordinates[selectedOrder.orderId]?.pickupName}</strong></div><div><span>Delivery Location</span><strong>{selectedOrder.location}</strong></div><div><span>Tracking ID</span><strong>{selectedOrder.trackingId}</strong></div><div><span>Delivery Partner</span><strong>{selectedOrder.deliveryPartner}</strong></div><div><span>Current Location</span><strong>{coordinates[selectedOrder.orderId]?.currentName}</strong></div><div><span>Expected Delivery</span><strong>{date(selectedOrder.deliveryDate)}</strong></div><div><span>Last Updated</span><strong>{selectedOrder.lastUpdated}</strong></div></div><div className="delivery-timeline"><h4>Delivery Timeline</h4>{selectedOrder.timeline.map((stage, index) => <div className={`timeline-step ${index === selectedOrder.timeline.length - 1 ? 'timeline-step--current' : ''}`} key={`${stage.label}-${stage.time}`}><span className="timeline-marker">{index === selectedOrder.timeline.length - 1 ? <Truck size={14} /> : <Check size={14} />}</span><div><strong>{stage.label}</strong><span>{stage.time}</span></div></div>)}</div>{selectedOrder.deliveryStatus === 'Delivered' && <div className="delivery-callout delivery-callout--delivered"><Check size={18} /><div><strong>Delivered</strong><span>Delivered on {selectedOrder.deliveredOn}</span></div></div>}{selectedOrder.deliveryStatus === 'Delayed' && <div className="delivery-callout delivery-callout--delayed"><Minus size={18} /><div><strong>Delayed</strong><span>Current location: {coordinates[selectedOrder.orderId]?.currentName}</span><span>Reason: Delivery delayed</span><span>New expected delivery: {date(selectedOrder.newDeliveryDate)}</span></div></div>}</div>}</Modal></div></DashboardLayout>;
};

export default FarmerDeliveryPage;
