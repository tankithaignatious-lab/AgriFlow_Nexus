import DashboardLayout from '../../layouts/DashboardLayout';

const FarmerAddProducePage = () => {
  return (
    <DashboardLayout role="farmer" title="Add Produce">
      <div className="content-panel">
        <h3>Add new produce listing</h3>
        <p className="muted-text">This form will be connected to a Django API later.</p>
      </div>
    </DashboardLayout>
  );
};

export default FarmerAddProducePage;
