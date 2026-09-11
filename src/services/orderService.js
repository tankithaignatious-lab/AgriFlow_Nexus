import { orders } from '../data/mockData';

export const getOrders = async () => Promise.resolve(orders);
export const getOrderTracking = async () => Promise.resolve([
  'Demand Created',
  'Supply Matched',
  'Order Confirmed',
  'Pickup',
  'In Transit',
  'Delivered',
]);
