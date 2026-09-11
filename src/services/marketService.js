import { marketPrices, priceTimeline } from '../data/mockData';

export const getMarketPrices = async () => Promise.resolve(marketPrices);
export const getPriceTrend = async () => Promise.resolve(priceTimeline);
