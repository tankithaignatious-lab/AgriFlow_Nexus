import DashboardLayout from '../../layouts/DashboardLayout';
import StatCard from '../../components/StatCard';
import DataTable from '../../components/DataTable';
import SupplyDemandChart from '../../components/SupplyDemandChart';
import DemandChart from '../../components/DemandChart';
import { fpos, farmers, supplyDemandGap, topDemandedCrops } from '../../data/mockData';

const aggregationColumns = [
  { label: 'Farmer', key: 'name' },
  { label: 'Village', key: 'village' },
  { label: 'Produce', key: 'produce' },
  { label: 'Quantity', key: 'quantity' },
  { label: 'Quality', key: 'quality' },
];

const buyerDemandColumns = [
  { label: 'Commodity', key: 'commodity' },
  { label: 'Quantity', key: 'quantity' },
  { label: 'Source', key: 'source' },
  { label: 'Deadline', key: 'deadline' },
];

const FpoDashboard = () => {
  return (
    <DashboardLayout role="FPO" title="FPO Dashboard">
      <section className="stats-grid">
        <StatCard title="Registered Farmers" value={farmers.length.toString()} subtitle="Active members" accent="green" />
        <StatCard title="Total Aggregated Produce" value="4,200 kg" subtitle="This week" accent="teal" />
        <StatCard title="Active Buyer Demand" value="12" subtitle="Across districts" accent="amber" />
        <StatCard title="Pending Orders" value="8" subtitle="To consolidate" accent="dark" />
      </section>

      <section className="section-block">
        <div className="section-header">
          <h3>Farmer Supply Aggregation</h3>
        </div>
        <DataTable columns={aggregationColumns} rows={farmers} />
      </section>

      <section className="two-column-grid">
        <div className="section-block">
          <div className="section-header">
            <h3>Buyer Demand</h3>
          </div>
          <DataTable columns={buyerDemandColumns} rows={[
            { commodity: 'Tomato', quantity: '5,000 kg', source: 'Coimbatore Buyers', deadline: '18 Sep' },
            { commodity: 'Onion', quantity: '3,200 kg', source: 'Retail Network', deadline: '20 Sep' },
            { commodity: 'Potato', quantity: '4,200 kg', source: 'Urban Hubs', deadline: '21 Sep' },
          ]} />
        </div>

        <div className="section-block">
          <div className="section-header">
            <h3>Supply-Demand Gap</h3>
          </div>
          <SupplyDemandChart data={supplyDemandGap} />
        </div>
      </section>

      <section className="two-column-grid">
        <div className="section-block">
          <div className="section-header">
            <h3>Top Demanded Crops</h3>
          </div>
          <DemandChart data={topDemandedCrops} />
        </div>

        <div className="section-block">
          <div className="section-header">
            <h3>Recommended Aggregation Opportunities</h3>
          </div>
          <div className="list-stack">
            {[
              { crop: 'Tomato', supply: 4200, demand: 5000, gap: 800 },
              { crop: 'Onion', supply: 3600, demand: 3300, gap: -300 },
              { crop: 'Potato', supply: 4400, demand: 4800, gap: 400 },
            ].map((item) => (
              <div key={item.crop} className="opportunity-card">
                <strong>{item.crop}</strong>
                <span>Available Supply: {item.supply} kg</span>
                <span>Buyer Demand: {item.demand} kg</span>
                <span>Gap: {item.gap} kg</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default FpoDashboard;
