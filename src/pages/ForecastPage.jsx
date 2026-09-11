import { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import ForecastCard from '../components/ForecastCard';
import { forecasts } from '../data/mockData';

const ForecastPage = () => {
  const [selectedCrop, setSelectedCrop] = useState('Tomato');
  const [selectedLocation, setSelectedLocation] = useState('Tamil Nadu');
  const [selectedPeriod, setSelectedPeriod] = useState('7 days');

  const item = forecasts.find((forecast) => forecast.crop === selectedCrop && forecast.period === selectedPeriod) || forecasts[0];

  return (
    <DashboardLayout role="Farmer" title="AI Forecast">
      <div className="section-block">
        <div className="section-header">
          <h3>Predictive demand outlook</h3>
        </div>
        <div className="forecast-controls">
          <label>
            Crop
            <select value={selectedCrop} onChange={(event) => setSelectedCrop(event.target.value)}>
              <option>Tomato</option>
              <option>Onion</option>
              <option>Potato</option>
            </select>
          </label>
          <label>
            Location
            <select value={selectedLocation} onChange={(event) => setSelectedLocation(event.target.value)}>
              <option>Tamil Nadu</option>
              <option>Coimbatore</option>
              <option>Salem</option>
            </select>
          </label>
          <label>
            Forecast period
            <select value={selectedPeriod} onChange={(event) => setSelectedPeriod(event.target.value)}>
              <option>7 days</option>
              <option>14 days</option>
              <option>30 days</option>
            </select>
          </label>
        </div>

        <ForecastCard
          crop={item.crop}
          location={selectedLocation}
          period={selectedPeriod}
          demand={item.demand}
          supply={item.supply}
          gap={item.gap}
          price={item.price}
        />

        <div className="explain-card">
          <h4>Why this forecast?</h4>
          <ul>
            <li>Historical market trend</li>
            <li>Recent demand</li>
            <li>Seasonal pattern</li>
            <li>Available supply</li>
          </ul>
          <small>Forecasts are demo estimates for frontend prototype use. They are not guaranteed to be 100% accurate.</small>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ForecastPage;
