import { routes } from '../data/mockData';

export const getRoutes = async () => Promise.resolve(routes);
export const optimizeRoute = async () => Promise.resolve({
  beforeDistance: 126,
  beforeCost: 4200,
  afterDistance: 82,
  afterCost: 2850,
  savings: 1350,
  percentSavings: 32,
});
