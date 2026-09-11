import DashboardLayout from '../../layouts/DashboardLayout';

const FpoDemandPage = () => {
  return (
    <DashboardLayout role="FPO" title="Buyer Demand">
      <div className="content-panel">
        <h3>Demand intake</h3>
        <p className="muted-text">Buyer orders and required quantities are aggregated here.</p>
      </div>
    </DashboardLayout>
  );
};

export default FpoDemandPage;
