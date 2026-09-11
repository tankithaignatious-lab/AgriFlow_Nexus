import { farmers, fpos, supplyDemandGap, topDemandedCrops } from '../data/mockData';

export const getFpoFarmers = async () => Promise.resolve(farmers);
export const getAggregateProduce = async () => Promise.resolve(fpos);
export const getBuyerDemand = async () => Promise.resolve([
  { commodity: 'Tomato', quantity: '5,000 kg', source: 'Coimbatore Buyers', deadline: '18 Sep' },
  { commodity: 'Onion', quantity: '3,200 kg', source: 'Retail Channel', deadline: '20 Sep' },
  { commodity: 'Potato', quantity: '4,200 kg', source: 'Urban Hubs', deadline: '21 Sep' },
]);
export const getSupplyDemandGap = async () => Promise.resolve(supplyDemandGap);
export const getTopDemandedCrops = async () => Promise.resolve(topDemandedCrops);
