import { demands, matchResults } from '../data/mockData';

export const getBuyerDemands = async () => Promise.resolve(demands);
export const getMatchedSupply = async () => Promise.resolve(matchResults);
export const postDemand = async (payload) => Promise.resolve({ success: true, payload });
