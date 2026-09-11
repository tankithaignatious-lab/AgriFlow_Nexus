import DashboardLayout from '../../layouts/DashboardLayout';
import StatCard from '../../components/StatCard';
import MatchCard from '../../components/MatchCard';
import DataTable from '../../components/DataTable';
import MarketPriceChart from '../../components/MarketPriceChart';
import { priceTimeline, produce, marketPrices, matchResults } from '../../data/mockData';

const columns = [
  { label: 'Crop', key: 'crop' },
  { label: 'Quantity', key: 'quantity' },
  { label: 'Quality', key: 'quality' },
  { label: 'Expected Harvest', key: 'harvest' },
  { label: 'Status', key: 'status' },
  { label: 'Matched Buyer', key: 'matchedBuyer' },
  { label: 'Action', key: 'action' },
];

const FarmerDashboard = () => {
  return (
    <DashboardLayout role="farmer" title="Farmer Dashboard">
      <section className="stats-grid">
        <StatCard title="Available Produce" value="3,200 kg" subtitle="Across 4 crops" trend="+12%" accent="green" />
        <StatCard title="Active Orders" value="12" subtitle="This month" trend="+4" accent="teal" />
        <StatCard title="Pending Buyer Requests" value="6" subtitle="Awaiting response" trend="+2" accent="amber" />
        <StatCard title="Estimated Earnings" value="₹1.84L" subtitle="Projected this cycle" trend="+8.6%" accent="dark" />
      </section>

      <section className="section-block">
        <div className="section-header">
          <h3>My Products</h3>
          <button type="button" className="text-button">View all</button>
        </div>
        <DataTable columns={columns} rows={produce} />
      </section>

      <section className="two-column-grid">
        <div className="section-block">
          <div className="section-header">
            <h3>Market Price</h3>
            <span className="pill-tag">Demo data</span>
          </div>
          <div className="price-list">
            {marketPrices.slice(0, 4).map((item) => (
              <div key={`${item.commodity}-${item.market}`} className="price-row">
                <div>
                  <strong>{item.commodity}</strong>
                  <span>{item.market}</span>
                </div>
                <div>
                  <small>Modal</small>
                  <strong>₹{item.modal}/kg</strong>
                </div>
                <div>
                  <small>Min</small>
                  <strong>₹{item.min}/kg</strong>
                </div>
                <div>
                  <small>Max</small>
                  <strong>₹{item.max}/kg</strong>
                </div>
              </div>
            ))}
          </div>
          <MarketPriceChart data={priceTimeline} />
        </div>

        <div className="section-block">
          <div className="section-header">
            <h3>Recommended Buyer Matches</h3>
            <span className="pill-tag">AI-assisted</span>
          </div>
          <div className="match-list">
            {matchResults.map((item) => (
              <MatchCard
                key={item.supplier}
                buyer={item.supplier}
                quantity={item.quantity}
                distance={item.distance}
                price={item.price}
                date="16 Sep"
                score={item.matchScore}
                onView={() => {}}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-header">
          <h3>Earnings Overview</h3>
        </div>
        <MarketPriceChart data={priceTimeline} />
      </section>

    </DashboardLayout>
  );
};

export default FarmerDashboard;
