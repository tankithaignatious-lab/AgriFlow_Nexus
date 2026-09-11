import DashboardLayout from '../../layouts/DashboardLayout';

const AdminMatchingPage = () => (
  <DashboardLayout role="Admin" title="Matching">
    <div className="content-panel">
      <h3>Explainable Matching</h3>
      <p className="muted-text">Model and rule-based supplier matching insights for buyers and FPOs.</p>
    </div>
  </DashboardLayout>
);

export default AdminMatchingPage;
