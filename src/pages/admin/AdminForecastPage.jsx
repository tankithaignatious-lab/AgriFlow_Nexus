import DashboardLayout from '../../layouts/DashboardLayout';
import ForecastCard from '../../components/ForecastCard';
import { forecasts } from '../../data/mockData';

const AdminForecastPage = () => (
  <DashboardLayout role="Admin" title="AI Forecast">
    <div className="section-block">
      <div className="section-header">
        <h3>Crop Forecasting</h3>
      </div>
      <div className="forecast-list">
        {forecasts.map((item) => (
          <ForecastCard
            key={`${item.crop}-${item.period}`}
            crop={item.crop}
            location={item.location}
            period={item.period}
            demand={item.demand}
            supply={item.supply}
            gap={item.gap}
            price={item.price}
          />
        ))}
      </div>
    </div>
  </DashboardLayout>
);

export default AdminForecastPage;
