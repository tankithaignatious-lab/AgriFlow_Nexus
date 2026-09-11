import DashboardLayout from '../../layouts/DashboardLayout';
import StatCard from '../../components/StatCard';
import SupplyDemandChart from '../../components/SupplyDemandChart';
import DemandChart from '../../components/DemandChart';
import { adminOverview, supplyDemandGap, topDemandedCrops, priceTimeline } from '../../data/mockData';

const AdminDashboard = () => {
  return (
    <DashboardLayout role="Admin" title="Admin Dashboard">
      <section className="stats-grid stats-grid--compact">
        <StatCard title="Total Farmers" value={adminOverview.farmers.toLocaleString()} subtitle="Registered" accent="green" />
        <StatCard title="Total FPOs" value={adminOverview.fpos.toLocaleString()} subtitle="Active clusters" accent="teal" />
        <StatCard title="Total Buyers" value={adminOverview.buyers.toLocaleString()} subtitle="Trade participants" accent="amber" />
        <StatCard title="Active Orders" value={adminOverview.activeOrders.toLocaleString()} subtitle="In motion" accent="dark" />
        <StatCard title="Total Produce" value={`${adminOverview.totalProduce.toLocaleString()} kg`} subtitle="Across network" accent="green" />
        <StatCard title="Farmer Earnings" value={`₹${adminOverview.farmerEarnings.toLocaleString()}`} subtitle="Current cycle" accent="dark" />
      </section>

      <section className="two-column-grid">
        <div className="section-block">
          <div className="section-header">
            <h3>Supply vs Demand</h3>
          </div>
          <SupplyDemandChart data={supplyDemandGap} />
        </div>

        <div className="section-block">
          <div className="section-header">
            <h3>Market Price Trend</h3>
          </div>
          <DemandChart data={topDemandedCrops} />
        </div>
      </section>

      <section className="two-column-grid">
        <div className="section-block">
          <div className="section-header">
            <h3>Orders by Crop</h3>
          </div>
          <DemandChart data={topDemandedCrops} />
        </div>

        <div className="section-block">
          <div className="section-header">
            <h3>Farmer Earnings</h3>
          </div>
          <DemandChart data={topDemandedCrops} />
        </div>
      </section>

      <section className="section-block">
        <div className="section-header">
          <h3>System Overview</h3>
        </div>
        <div className="system-flow">
          <span>Farmers</span>
          <span>↓</span>
          <span>FPO</span>
          <span>↓</span>
          <span>Demand Aggregation</span>
          <span>↓</span>
          <span>AI Matching</span>
          <span>↓</span>
          <span>Route Optimization</span>
          <span>↓</span>
          <span>Buyer</span>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default AdminDashboard;
