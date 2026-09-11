import { NavLink } from 'react-router-dom';
import { BarChart3, Bell, Boxes, BriefcaseBusiness, CarFront, ChartColumn, ClipboardList, CircleDollarSign, Factory, Heart, Leaf, LogOut, MapPinned, Package, Settings, ShoppingCart, Truck, UserCircle, Users, Warehouse } from 'lucide-react';

const navConfig = {
  farmer: [
    { label: 'Dashboard', to: '/farmer/dashboard', icon: BarChart3 },
    { label: 'My Products', to: '/farmer/produce', icon: Leaf },
    { label: 'Buyer Requests', to: '/farmer/requests', icon: ClipboardList },
    { label: 'Orders', to: '/farmer/orders', icon: ShoppingCart },
    { label: 'Payments', to: '/farmer/payments', icon: CircleDollarSign },
    { label: 'Delivery', to: '/farmer/delivery', icon: Truck },
    { label: 'Market Prices', to: '/farmer/prices', icon: ChartColumn },
    { label: 'Profile', to: '/farmer/profile', icon: Users },
  ],
  fpo: [
    { label: 'Dashboard', to: '/fpo/dashboard', icon: BarChart3 },
    { label: 'Farmers', to: '/fpo/farmers', icon: Users },
    { label: 'Aggregate Produce', to: '/fpo/aggregation', icon: Warehouse },
    { label: 'Buyer Demand', to: '/fpo/demand', icon: ShoppingCart },
    { label: 'Matches', to: '/fpo/matches', icon: Boxes },
    { label: 'Orders', to: '/fpo/orders', icon: ClipboardList },
    { label: 'Logistics', to: '/fpo/logistics', icon: CarFront },
    { label: 'Market Intelligence', to: '/fpo/market', icon: MapPinned },
    { label: 'Reports', to: '/fpo/reports', icon: Factory },
  ],
  buyer: [
    { label: 'Dashboard', to: '/buyer/dashboard', icon: BarChart3 },
    { label: 'Browse Products', to: '/buyer/products', icon: Leaf },
    { label: 'My Cart', to: '/buyer/cart', icon: ShoppingCart },
    { label: 'My Orders', to: '/buyer/orders', icon: ClipboardList },
    { label: 'Track Order', to: '/buyer/track', icon: Truck },
    { label: 'My Requests', to: '/buyer/requests', icon: ClipboardList },
    { label: 'Wishlist', to: '/buyer/wishlist', icon: Heart },
    { label: 'Farmers', to: '/buyer/farmers', icon: Users },
    { label: 'Market Prices', to: '/buyer/prices', icon: ChartColumn },
    { label: 'Payments', to: '/buyer/payments', icon: CircleDollarSign },
    { label: 'Notifications', to: '/buyer/notifications', icon: Bell },
    { label: 'Profile', to: '/buyer/profile', icon: UserCircle },
    { label: 'Settings', to: '/buyer/settings', icon: Settings },
    { label: 'Logout', to: '/login', icon: LogOut },
  ],
  logistics: [
    { label: 'Dashboard', to: '/logistics/dashboard', icon: BarChart3 },
    { label: 'Assigned Orders', to: '/logistics/orders', icon: ClipboardList },
    { label: 'Routes', to: '/logistics/routes', icon: MapPinned },
    { label: 'Vehicles', to: '/logistics/vehicles', icon: CarFront },
    { label: 'Deliveries', to: '/logistics/deliveries', icon: Package },
    { label: 'Performance', to: '/logistics/performance', icon: ChartColumn },
  ],
  admin: [
    { label: 'Overview', to: '/admin/dashboard', icon: BarChart3 },
    { label: 'Users', to: '/admin/users', icon: Users },
    { label: 'Farmers', to: '/admin/farmers', icon: Leaf },
    { label: 'FPOs', to: '/admin/fpos', icon: Factory },
    { label: 'Buyers', to: '/admin/buyers', icon: ShoppingCart },
    { label: 'Orders', to: '/admin/orders', icon: ClipboardList },
    { label: 'Market Data', to: '/admin/market', icon: ChartColumn },
    { label: 'AI Forecast', to: '/admin/forecast', icon: Boxes },
    { label: 'Logistics', to: '/admin/logistics', icon: CarFront },
    { label: 'Reports', to: '/admin/reports', icon: Settings },
  ],
};

const Sidebar = ({ role = 'farmer', isMobileOpen = false, onClose }) => {
  const items = navConfig[role] || navConfig.farmer;

  return (
    <aside className={`sidebar ${isMobileOpen ? 'sidebar--open' : ''}`}>
      <div className="sidebar__brand">
        <div className="brand-mark">A</div>
        <div>
          <strong>AgriFlow Nexus</strong>
          <span>Supply Chain Intelligence</span>
        </div>
      </div>

      <nav className="sidebar__nav">
        {items.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) => `nav-item ${isActive ? 'nav-item--active' : ''}`}
            onClick={onClose}
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
