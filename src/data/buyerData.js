export const buyerProducts = [
  { id: 'PRD-101', name: 'Tomato', category: 'Vegetable', farmer: 'Ramu Selvam', farm: 'Selvam Green Farm', location: 'Kallakurichi', quantity: 800, price: 28, marketPrice: 30, rating: 4.8, availability: 'Available', image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=800&q=80', description: 'Grade A vine-ripened tomatoes harvested to order.', updated: 'Today, 09:40 AM' },
  { id: 'PRD-102', name: 'Potato', category: 'Root Vegetable', farmer: 'Karthik', farm: 'Karthik Fields', location: 'Erode', quantity: 1200, price: 32, marketPrice: 34, rating: 4.7, availability: 'Available', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80', description: 'Firm, clean potatoes suitable for retail and food service.', updated: 'Today, 08:15 AM' },
  { id: 'PRD-103', name: 'Onion', category: 'Root Vegetable', farmer: 'Anitha Devi', farm: 'Devi Harvests', location: 'Salem', quantity: 600, price: 26, marketPrice: 29, rating: 4.6, availability: 'Low Stock', image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80', description: 'Aromatic red onions with a reliable shelf life.', updated: 'Yesterday, 04:20 PM' },
  { id: 'PRD-104', name: 'Carrot', category: 'Root Vegetable', farmer: 'Meena Krishnan', farm: 'Meena Organics', location: 'Coimbatore', quantity: 450, price: 38, marketPrice: 42, rating: 4.9, availability: 'Available', image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=800&q=80', description: 'Fresh, crisp carrots grown with low-input practices.', updated: 'Today, 07:50 AM' },
  { id: 'PRD-105', name: 'Spinach', category: 'Leafy Green', farmer: 'Suresh Kumar', farm: 'Nila Greens', location: 'Salem', quantity: 180, price: 30, marketPrice: 33, rating: 4.5, availability: 'Low Stock', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80', description: 'Tender leafy greens packed on the day of dispatch.', updated: 'Today, 06:30 AM' },
  { id: 'PRD-106', name: 'Green Chilli', category: 'Spice', farmer: 'Lakshmi Farm Collective', farm: 'Dindigul Growers', location: 'Dindigul', quantity: 260, price: 56, marketPrice: 60, rating: 4.4, availability: 'Available', image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80', description: 'Bright, fresh green chillies for restaurants and retailers.', updated: 'Yesterday, 05:10 PM' },
];

export const buyerOrders = [
  { id: 'ORD-2401', product: 'Tomato', farmer: 'Ramu Selvam', quantity: 120, total: 3360, date: '10 Sep 2026', status: 'In Transit', expected: '13 Sep 2026', trackingId: 'AFX-88421', pickup: 'Kallakurichi Farm Hub', currentLocation: 'Salem Distribution Centre', delivery: 'Coimbatore, Tamil Nadu', partner: 'Nexus Logistics' },
  { id: 'ORD-2396', product: 'Carrot', farmer: 'Meena Krishnan', quantity: 60, total: 2280, date: '07 Sep 2026', status: 'Delivered', expected: '09 Sep 2026', trackingId: 'AFX-88314', pickup: 'Coimbatore Farm Hub', currentLocation: 'Coimbatore', delivery: 'Coimbatore, Tamil Nadu', partner: 'Nexus Logistics' },
  { id: 'ORD-2392', product: 'Onion', farmer: 'Anitha Devi', quantity: 90, total: 2340, date: '06 Sep 2026', status: 'Confirmed', expected: '14 Sep 2026', trackingId: 'AFX-88290', pickup: 'Salem Farm Hub', currentLocation: 'Salem', delivery: 'Coimbatore, Tamil Nadu', partner: 'Nexus Logistics' },
];

export const buyerNotifications = [
  { id: 1, title: 'Order in transit', message: 'ORD-2401 reached Salem Distribution Centre.', time: '18 minutes ago', unread: true },
  { id: 2, title: 'Payment successful', message: 'Payment for ORD-2401 was recorded successfully.', time: 'Yesterday', unread: true },
  { id: 3, title: 'Market price update', message: 'Tomato reference price moved to ₹30/KG.', time: 'Yesterday', unread: false },
];
