const ForecastCard = ({ crop, location, period, demand, supply, gap, price }) => {
  return (
    <div className="forecast-card">
      <div className="forecast-card__header">
        <h3>{crop}</h3>
        <span>{location}</span>
      </div>
      <div className="forecast-grid">
        <div>
          <label>Predicted Demand</label>
          <strong>{demand.toLocaleString()} kg</strong>
        </div>
        <div>
          <label>Current Supply</label>
          <strong>{supply.toLocaleString()} kg</strong>
        </div>
        <div>
          <label>Expected Supply Gap</label>
          <strong>{gap > 0 ? '+' : ''}{gap.toLocaleString()} kg</strong>
        </div>
        <div>
          <label>Predicted Price</label>
          <strong>₹{price}/kg</strong>
        </div>
      </div>
      <small>{period}</small>
    </div>
  );
};

export default ForecastCard;
