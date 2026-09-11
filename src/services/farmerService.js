import { produce, marketPrices } from '../data/mockData';

export const getFarmerProduce = async () => Promise.resolve(produce);
export const getMarketPrices = async () => Promise.resolve(marketPrices);
export const getBuyerRequests = async () => Promise.resolve([
  { buyer: 'Hotel Buyer', quantity: '1,500 kg', price: '₹28/kg', distance: '12 km', date: '16 Sep' },
  { buyer: 'Fresh Basket Retail', quantity: '850 kg', price: '₹27/kg', distance: '18 km', date: '18 Sep' },
]);
