import DashboardLayout from '../../layouts/DashboardLayout';

const BuyerPostDemandPage = () => {
  return (
    <DashboardLayout role="buyer" title="Post Demand">
      <div className="content-panel">
        <h3>Demand posting form</h3>
        <p className="muted-text">The buyer demand form will eventually submit to the Django backend.</p>
      </div>
    </DashboardLayout>
  );
};

export default BuyerPostDemandPage;
