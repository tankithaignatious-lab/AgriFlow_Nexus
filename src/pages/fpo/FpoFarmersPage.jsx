import DashboardLayout from '../../layouts/DashboardLayout';

const FpoFarmersPage = () => {
  return (
    <DashboardLayout role="FPO" title="Farmers">
      <div className="content-panel">
        <h3>Farmer Registry</h3>
        <p className="muted-text">Farmer network and cluster details.</p>
      </div>
    </DashboardLayout>
  );
};

export default FpoFarmersPage;
