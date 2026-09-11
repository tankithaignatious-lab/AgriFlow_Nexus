const RouteMap = ({ route }) => {
  const { source, collection, destination, distance, eta, vehicle, capacity, load, cost } = route;

  return (
    <div className="route-map">
      <div className="route-map__map-card">
        <div className="route-node route-node--start">{source}</div>
        <div className="route-connector">↓</div>
        <div className="route-node">{collection}</div>
        <div className="route-connector">↓</div>
        <div className="route-node route-node--end">{destination}</div>
      </div>

      <div className="route-summary">
        <div>
          <span>Distance</span>
          <strong>{distance} km</strong>
        </div>
        <div>
          <span>Estimated Time</span>
          <strong>{eta}</strong>
        </div>
        <div>
          <span>Vehicle Capacity</span>
          <strong>{capacity} MT</strong>
        </div>
        <div>
          <span>Load Utilization</span>
          <strong>{load}%</strong>
        </div>
        <div>
          <span>Logistics Cost</span>
          <strong>₹{cost.toLocaleString()}</strong>
        </div>
        <div>
          <span>Vehicle</span>
          <strong>{vehicle}</strong>
        </div>
      </div>
    </div>
  );
};

export default RouteMap;
