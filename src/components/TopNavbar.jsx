import { Bell, Menu, Search } from 'lucide-react';

const TopNavbar = ({ title, role = 'Farmer', onMenuToggle }) => {
  return (
    <header className="topbar">
      <div className="topbar__left">
        <button type="button" className="menu-button" onClick={onMenuToggle} aria-label="Toggle menu">
          <Menu size={20} />
        </button>
        <div>
          <p className="eyebrow">AgriFlow Nexus</p>
          <h1>{title}</h1>
        </div>
      </div>

      <div className="topbar__actions">
        <label className="search-box" aria-label="Search">
          <Search size={16} />
          <input type="text" placeholder="Search" />
        </label>
        <button type="button" className="icon-button" aria-label="Notifications">
          <Bell size={18} />
        </button>
      </div>
    </header>
  );
};

export default TopNavbar;
