import DashboardLayout from '../../layouts/DashboardLayout';
import DataTable from '../../components/DataTable';
import { orders } from '../../data/mockData';

const columns = [
  { label: 'Order ID', key: 'id' },
  { label: 'Crop', key: 'crop' },
  { label: 'Quantity', key: 'quantity' },
  { label: 'Status', key: 'status' },
  { label: 'Buyer', key: 'buyer' },
  { label: 'Value', key: 'value' },
];

const BuyerOrdersPage = () => (
  <DashboardLayout role="buyer" title="Orders">
    <div className="section-block">
      <div className="section-header">
        <h3>Order History</h3>
      </div>
      <DataTable columns={columns} rows={orders} />
    </div>
  </DashboardLayout>
);

export default BuyerOrdersPage;
