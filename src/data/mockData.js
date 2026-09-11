export const DEMO_MESSAGE = 'Demo data only. This interface is a frontend prototype and does not represent real farmers or transactions.';

export const farmers = [
  { id: 1, name: 'Ramu Selvam', village: 'Kallakurichi', district: 'Tamil Nadu', produce: 'Tomato', quantity: 1200, quality: 'Grade A' },
  { id: 2, name: 'Anitha Devi', village: 'Coimbatore', district: 'Tamil Nadu', produce: 'Onion', quantity: 850, quality: 'Grade B' },
  { id: 3, name: 'Karthik', village: 'Erode', district: 'Tamil Nadu', produce: 'Potato', quantity: 1600, quality: 'Grade A' },
  { id: 4, name: 'Meena', village: 'Salem', district: 'Tamil Nadu', produce: 'Tomato', quantity: 980, quality: 'Grade A' },
];

export const fpos = [
  { id: 1, name: 'FPO Coimbatore', district: 'Coimbatore', farmers: 48, stock: 4200, demand: 5000 },
  { id: 2, name: 'Green Valley FPO', district: 'Erode', farmers: 36, stock: 3300, demand: 4200 },
  { id: 3, name: 'AgriLink FPO', district: 'Salem', farmers: 52, stock: 6100, demand: 5600 },
];

export const buyers = [
  { id: 1, name: 'Hotel Buyer', type: 'Hospitality', location: 'Coimbatore', demand: 1500 },
  { id: 2, name: 'Fresh Basket Retail', type: 'Retail', location: 'Madurai', demand: 2200 },
  { id: 3, name: 'Urban Food Hub', type: 'Wholesale', location: 'Chennai', demand: 1800 },
  { id: 4, name: 'Vallan Foods', type: 'Processor', location: 'Salem', demand: 3000 },
];

export const produce = [
  { id: 1, crop: 'Tomato', farmer: 'Ramu Selvam', quantity: 800, quality: 'Grade A', harvest: '15 Sep', status: 'Available', matchedBuyer: 'Hotel Buyer', action: 'View' },
  { id: 2, crop: 'Onion', farmer: 'Anitha Devi', quantity: 600, quality: 'Grade B', harvest: '18 Sep', status: 'Reserved', matchedBuyer: 'Fresh Basket Retail', action: 'View' },
  { id: 3, crop: 'Potato', farmer: 'Karthik', quantity: 1200, quality: 'Grade A', harvest: '20 Sep', status: 'Available', matchedBuyer: 'Fresh Basket Retail', action: 'View' },
  { id: 4, crop: 'Tomato', farmer: 'Meena', quantity: 750, quality: 'Grade A', harvest: '16 Sep', status: 'Available', matchedBuyer: 'Urban Food Hub', action: 'View' },
];

export const demands = [
  { id: 1, commodity: 'Tomato', quantity: 2000, date: '16 Sep', quality: 'Grade A', location: 'Coimbatore', maxPrice: 32 },
  { id: 2, commodity: 'Onion', quantity: 1600, date: '18 Sep', quality: 'Grade B', location: 'Erode', maxPrice: 26 },
  { id: 3, commodity: 'Potato', quantity: 2400, date: '19 Sep', quality: 'Grade A', location: 'Salem', maxPrice: 30 },
];

export const orders = [
  { id: 'ORD-2401', crop: 'Tomato', quantity: 1200, status: 'In Transit', buyer: 'Hotel Buyer', value: '₹34,000' },
  { id: 'ORD-2402', crop: 'Onion', quantity: 900, status: 'Confirmed', buyer: 'Fresh Basket Retail', value: '₹24,700' },
  { id: 'ORD-2403', crop: 'Potato', quantity: 1500, status: 'Pickup Scheduled', buyer: 'Urban Food Hub', value: '₹27,500' },
  { id: 'ORD-2404', crop: 'Tomato', quantity: 1100, status: 'Delivered', buyer: 'Vallan Foods', value: '₹31,800' },
];

export const marketPrices = [
  { commodity: 'Tomato', market: 'Coimbatore', district: 'Coimbatore', min: 24, max: 30, modal: 27, date: '10 Sep' },
  { commodity: 'Tomato', market: 'Erode', district: 'Erode', min: 22, max: 28, modal: 26, date: '10 Sep' },
  { commodity: 'Onion', market: 'Salem', district: 'Salem', min: 20, max: 25, modal: 23, date: '10 Sep' },
  { commodity: 'Potato', market: 'Madurai', district: 'Madurai', min: 28, max: 34, modal: 31, date: '10 Sep' },
  { commodity: 'Tomato', market: 'Trichy', district: 'Trichy', min: 25, max: 31, modal: 28, date: '10 Sep' },
];

export const priceTimeline = [
  { date: '01 Sep', Tomato: 24, Onion: 20, Potato: 28 },
  { date: '04 Sep', Tomato: 25, Onion: 21, Potato: 29 },
  { date: '07 Sep', Tomato: 26, Onion: 22, Potato: 30 },
  { date: '10 Sep', Tomato: 27, Onion: 23, Potato: 31 },
  { date: '13 Sep', Tomato: 29, Onion: 24, Potato: 32 },
  { date: '16 Sep', Tomato: 28, Onion: 25, Potato: 33 },
];

export const forecasts = [
  { crop: 'Tomato', location: 'Tamil Nadu', period: '7 days', demand: 15500, supply: 13200, gap: 2300, price: 29 },
  { crop: 'Onion', location: 'Tamil Nadu', period: '14 days', demand: 7900, supply: 8200, gap: -300, price: 24 },
  { crop: 'Potato', location: 'Tamil Nadu', period: '30 days', demand: 10200, supply: 9800, gap: 400, price: 32 },
];

export const routes = [
  { id: 1, source: 'Farmer A', collection: 'FPO Collection Center', destination: 'Buyer', distance: 82, eta: '4h 20m', vehicle: 'Truck 14 MT', capacity: 14, load: 72, cost: 2850 },
  { id: 2, source: 'Farmer B', collection: 'FPO Collection Center', destination: 'Buyer', distance: 91, eta: '5h 10m', vehicle: 'Truck 10 MT', capacity: 10, load: 68, cost: 3220 },
  { id: 3, source: 'Farmer C', collection: 'Regional Hub', destination: 'Buyer', distance: 76, eta: '3h 50m', vehicle: 'Truck 7 MT', capacity: 7, load: 80, cost: 2640 },
];

export const matchResults = [
  { supplier: 'FPO Coimbatore', quantity: '2,100 kg', distance: '18 km', price: '₹27/kg', quality: 'Grade A', matchScore: 95, reasons: { quantity: true, price: true, distance: true, quality: true, delivery: true } },
  { supplier: 'Green Valley FPO', quantity: '1,920 kg', distance: '26 km', price: '₹28/kg', quality: 'Grade A', matchScore: 91, reasons: { quantity: true, price: true, distance: true, quality: true, delivery: true } },
  { supplier: 'AgriLink FPO', quantity: '1,780 kg', distance: '34 km', price: '₹29/kg', quality: 'Grade A', matchScore: 88, reasons: { quantity: true, price: true, distance: true, quality: true, delivery: true } },
];

export const supplyDemandGap = [
  { crop: 'Tomato', supply: 4200, demand: 5000 },
  { crop: 'Onion', supply: 3600, demand: 3300 },
  { crop: 'Potato', supply: 4400, demand: 4800 },
  { crop: 'Banana', supply: 3100, demand: 2900 },
];

export const topDemandedCrops = [
  { crop: 'Tomato', demand: 5000 },
  { crop: 'Onion', demand: 4200 },
  { crop: 'Potato', demand: 3600 },
  { crop: 'Banana', demand: 3100 },
];

export const adminOverview = {
  farmers: 1240,
  fpos: 82,
  buyers: 310,
  activeOrders: 148,
  totalProduce: 185000,
  farmerEarnings: 12600000,
};

export const roleOptions = ['Farmer', 'FPO', 'Buyer', 'Logistics Provider', 'Admin'];
