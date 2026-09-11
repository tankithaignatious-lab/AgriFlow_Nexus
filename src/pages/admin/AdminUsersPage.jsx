import DashboardLayout from '../../layouts/DashboardLayout';

const AdminUsersPage = () => (
  <DashboardLayout role="Admin" title="Users">
    <div className="content-panel">
      <h3>User management</h3>
      <p className="muted-text">Overview of all user accounts in the network.</p>
    </div>
  </DashboardLayout>
);

export default AdminUsersPage;
