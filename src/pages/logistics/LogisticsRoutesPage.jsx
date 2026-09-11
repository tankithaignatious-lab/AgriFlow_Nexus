import DashboardLayout from '../../layouts/DashboardLayout';
import { routes } from '../../data/mockData';

const LogisticsRoutesPage = () => (
  <DashboardLayout role="Logistics Provider" title="Routes">
    <div className="section-block">
      <div className="section-header">
        <h3>Assigned Route Plan</h3>
        <button type="button" className="button button--secondary">Optimize Route</button>
      </div>
      <div className="route-list">
        {routes.map((route) => (
          <div key={route.id} className="route-item">
            <strong>{route.source}</strong>
            <span>{route.collection}</span>
            <span>{route.destination}</span>
            <span>{route.distance} km</span>
            <span>{route.eta}</span>
          </div>
        ))}
      </div>
    </div>
  </DashboardLayout>
);

export default LogisticsRoutesPage;
