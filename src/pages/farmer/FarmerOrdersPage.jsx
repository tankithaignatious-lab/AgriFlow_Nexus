import DashboardLayout from '../../layouts/DashboardLayout';
import DataTable from '../../components/DataTable';
import { orders } from '../../data/mockData';

const columns = [
  { label: 'Order ID', key: 'id' },
  { label: 'Crop', key: 'crop' },
  { label: 'Quantity', key: 'quantity' },
  { label: 'Buyer', key: 'buyer' },
  { label: 'Status', key: 'status' },
  { label: 'Value', key: 'value' },
];

const FarmerOrdersPage = () => {
  return (
    <DashboardLayout role="farmer" title="Orders">
      <div className="section-block">
        <div className="section-header">
          <h3>Order Management</h3>
          <span className="pill-tag">Demo</span>
        </div>
        <DataTable columns={columns} rows={orders} />
      </div>
    </DashboardLayout>
  );
};

export default FarmerOrdersPage;
