import DashboardLayout from '../layouts/DashboardLayout';

const LogisticsOptimizationPage = () => {
  return (
    <DashboardLayout role="Logistics Provider" title="Logistics Optimization">
      <div className="section-block">
        <div className="section-header">
          <h3>Route optimization preview</h3>
        </div>
        <div className="optimization-grid">
          <div className="optimization-card">
            <h4>Before Optimization</h4>
            <p>Distance: 126 km</p>
            <p>Cost: ₹4,200</p>
          </div>
          <div className="optimization-card">
            <h4>After Optimization</h4>
            <p>Distance: 82 km</p>
            <p>Cost: ₹2,850</p>
          </div>
        </div>
        <div className="savings-banner">
          <strong>Savings: ₹1,350</strong>
          <span>32%</span>
        </div>
        <p className="muted-text">This is clearly labelled mock/demo optimization data until the Django OR-Tools API is connected.</p>
      </div>
    </DashboardLayout>
  );
};

export default LogisticsOptimizationPage;
