import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';

const DashboardLayout = ({ role, title, children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar role={role} isMobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="content-shell">
        <TopNavbar title={title} role={role} onMenuToggle={() => setMobileOpen((value) => !value)} />
        <main className="page-content">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
