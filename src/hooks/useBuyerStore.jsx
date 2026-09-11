import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { buyerNotifications, buyerOrders, buyerProducts } from '../data/buyerData';

const BuyerStoreContext = createContext(null);
const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; } };
const defaultSettings = {
  profile: { name: 'Hotel Buyer', email: 'buyer@agriflow.in', phone: '+91 98765 43210' },
  address: { address: '12 Market Road', city: 'Coimbatore', state: 'Tamil Nadu', pincode: '641001' },
  notifications: { orderUpdates: true, deliveryUpdates: true, requestUpdates: true, newProducts: true, marketPrices: true, promotions: false },
  privacy: { rememberMe: true, activeStatus: true, recommendations: true },
  theme: 'light',
  language: 'English',
};

export const BuyerStoreProvider = ({ children }) => {
  const [cart, setCart] = useState(() => read('agriflow-buyer-cart', []));
  const [wishlist, setWishlist] = useState(() => read('agriflow-buyer-wishlist', []));
  const [orders, setOrders] = useState(() => read('agriflow-buyer-orders', buyerOrders));
  const [requests, setRequests] = useState(() => read('agriflow-buyer-requests', []));
  const [notifications, setNotifications] = useState(() => read('agriflow-buyer-notifications', buyerNotifications));
  const [settings, setSettings] = useState(() => read('agriflow-buyer-settings', defaultSettings));

  useEffect(() => localStorage.setItem('agriflow-buyer-cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('agriflow-buyer-wishlist', JSON.stringify(wishlist)), [wishlist]);
  useEffect(() => localStorage.setItem('agriflow-buyer-orders', JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem('agriflow-buyer-requests', JSON.stringify(requests)), [requests]);
  useEffect(() => localStorage.setItem('agriflow-buyer-notifications', JSON.stringify(notifications)), [notifications]);
  useEffect(() => {
    localStorage.setItem('agriflow-buyer-settings', JSON.stringify(settings));
    document.documentElement.dataset.theme = settings.theme;
  }, [settings]);

  const addToCart = (product, quantity = 1) => setCart((current) => {
    const existing = current.find((item) => item.productId === product.id);
    if (existing) return current.map((item) => item.productId === product.id ? { ...item, quantity: Math.min(item.quantity + quantity, product.quantity) } : item);
    return [...current, { productId: product.id, quantity: Math.min(quantity, product.quantity), product }];
  });
  const updateCartQuantity = (productId, quantity) => setCart((current) => current.map((item) => item.productId === productId ? { ...item, quantity: Math.max(1, Math.min(quantity, item.product.quantity)) } : item));
  const removeFromCart = (productId) => setCart((current) => current.filter((item) => item.productId !== productId));
  const toggleWishlist = (product) => setWishlist((current) => current.some((item) => item.id === product.id) ? current.filter((item) => item.id !== product.id) : [...current, product]);
  const placeOrder = (details) => {
    const order = { id: `ORD-${Date.now().toString().slice(-5)}`, product: details.items.map((item) => item.product.name).join(', '), farmer: details.items.map((item) => item.product.farmer).join(', '), quantity: details.items.reduce((sum, item) => sum + item.quantity, 0), total: details.total, date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }), status: 'Order Placed', expected: '18 Sep 2026', trackingId: `AFX-${Date.now().toString().slice(-5)}`, pickup: 'Farmer collection point', currentLocation: 'Current location unavailable', delivery: details.address.city || 'Coimbatore', partner: 'Nexus Logistics' };
    setOrders((current) => [order, ...current]);
    setCart([]);
    setNotifications((current) => [{ id: Date.now(), title: 'Order placed', message: `${order.id} has been created successfully.`, time: 'Just now', unread: true }, ...current]);
    return order;
  };
  const unreadCount = notifications.filter((item) => item.unread).length;
  const clearCart = () => setCart([]);
  const clearWishlist = () => setWishlist([]);
  const resetSettings = () => setSettings(defaultSettings);
  const value = useMemo(() => ({ products: buyerProducts, cart, wishlist, orders, requests, notifications, settings, unreadCount, addToCart, updateCartQuantity, removeFromCart, toggleWishlist, placeOrder, setRequests, setNotifications, setSettings, clearCart, clearWishlist, resetSettings }), [cart, wishlist, orders, requests, notifications, settings, unreadCount]);
  return <BuyerStoreContext.Provider value={value}>{children}</BuyerStoreContext.Provider>;
};

export const useBuyerStore = () => useContext(BuyerStoreContext);
