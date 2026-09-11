import DashboardLayout from '../../layouts/DashboardLayout';

const AdminMarketPage = () => (
  <DashboardLayout role="Admin" title="Market Data">
    <div className="content-panel">
      <h3>Market Intelligence</h3>
      <p className="muted-text">Managed mandi prices, trade data, and district analytics.</p>
    </div>
  </DashboardLayout>
);

export default AdminMarketPage;
