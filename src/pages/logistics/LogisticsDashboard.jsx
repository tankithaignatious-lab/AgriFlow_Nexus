import DashboardLayout from '../../layouts/DashboardLayout';
import StatCard from '../../components/StatCard';
import RouteMap from '../../components/RouteMap';
import { routes } from '../../data/mockData';

const LogisticsDashboard = () => {
  return (
    <DashboardLayout role="Logistics Provider" title="Logistics Dashboard">
      <section className="stats-grid">
        <StatCard title="Active Deliveries" value="18" subtitle="Across regions" accent="green" />
        <StatCard title="Today's Pickups" value="9" subtitle="Ready for dispatch" accent="teal" />
        <StatCard title="Total Distance" value="1,240 km" subtitle="Planned routes" accent="amber" />
        <StatCard title="Vehicle Utilization" value="74%" subtitle="Fleet efficiency" accent="dark" />
      </section>

      <section className="section-block">
        <div className="section-header">
          <h3>Route Planning Map</h3>
          <button type="button" className="button button--secondary">Optimize Route</button>
        </div>
        <RouteMap route={routes[0]} />
      </section>
    </DashboardLayout>
  );
};

export default LogisticsDashboard;
