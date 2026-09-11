import { useMemo, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RoleSelectionPage from './pages/RoleSelectionPage';
import FarmerDashboard from './pages/farmer/FarmerDashboard';
import FarmerProducePage from './pages/farmer/FarmerProducePage';
import FarmerOrdersPage from './pages/farmer/FarmerOrdersPage';
import FarmerRequestsPage from './pages/farmer/FarmerRequestsPage';
import FarmerPaymentsPage from './pages/farmer/FarmerPaymentsPage';
import FarmerProfilePage from './pages/farmer/FarmerProfilePage';
import FarmerDeliveryPage from './pages/farmer/FarmerDeliveryPage';
import FpoDashboard from './pages/fpo/FpoDashboard';
import FpoFarmersPage from './pages/fpo/FpoFarmersPage';
import FpoAggregationPage from './pages/fpo/FpoAggregationPage';
import FpoDemandPage from './pages/fpo/FpoDemandPage';
import BuyerDashboard from './pages/buyer/BuyerDashboard';
import BuyerPostDemandPage from './pages/buyer/BuyerPostDemandPage';
import BuyerMatchesPage from './pages/buyer/BuyerMatchesPage';
import BuyerOrdersPage from './pages/buyer/BuyerOrdersPage';
import LogisticsDashboard from './pages/logistics/LogisticsDashboard';
import LogisticsRoutesPage from './pages/logistics/LogisticsRoutesPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminMarketPage from './pages/admin/AdminMarketPage';
import AdminForecastPage from './pages/admin/AdminForecastPage';
import AdminMatchingPage from './pages/admin/AdminMatchingPage';
import ForecastPage from './pages/ForecastPage';
import MatchingPage from './pages/MatchingPage';
import LogisticsOptimizationPage from './pages/LogisticsOptimizationPage';
import MarketIntelligencePage from './pages/MarketIntelligencePage';
import BuyerMarketplacePage from './pages/buyer/BuyerMarketplacePage';
import { BuyerCartPage, BuyerFarmersPage, BuyerNotificationsPage, BuyerPaymentsPage, BuyerProfilePage, BuyerRequestsPage, BuyerTrackPage, BuyerWishlistPage } from './pages/buyer/BuyerCommercePages';
import BuyerSettingsPage from './pages/buyer/BuyerSettingsPage';
import { BuyerStoreProvider } from './hooks/useBuyerStore';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Farmer');

  const roleMap = useMemo(
    () => ({
      Farmer: '/farmer/dashboard',
      FPO: '/fpo/dashboard',
      Buyer: '/buyer/dashboard',
      'Logistics Provider': '/logistics/dashboard',
      Admin: '/admin/dashboard',
    }),
    [],
  );

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <BuyerStoreProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route
          path="/role-selection"
          element={
            <RoleSelectionPage
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
              roleMap={roleMap}
              isAuthenticated={isAuthenticated}
            />
          }
        />

        <Route path="/" element={<Navigate to={isAuthenticated ? roleMap[selectedRole] : '/login'} replace />} />

        <Route path="/farmer/dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated}><FarmerDashboard /></ProtectedRoute>} />
        <Route path="/farmer/produce" element={<ProtectedRoute isAuthenticated={isAuthenticated}><FarmerProducePage /></ProtectedRoute>} />
        <Route path="/farmer/requests" element={<ProtectedRoute isAuthenticated={isAuthenticated}><FarmerRequestsPage /></ProtectedRoute>} />
        <Route path="/farmer/orders" element={<ProtectedRoute isAuthenticated={isAuthenticated}><FarmerOrdersPage /></ProtectedRoute>} />
        <Route path="/farmer/payments" element={<ProtectedRoute isAuthenticated={isAuthenticated}><FarmerPaymentsPage /></ProtectedRoute>} />
        <Route path="/farmer/profile" element={<ProtectedRoute isAuthenticated={isAuthenticated}><FarmerProfilePage /></ProtectedRoute>} />
        <Route path="/farmer/delivery" element={<ProtectedRoute isAuthenticated={isAuthenticated}><FarmerDeliveryPage /></ProtectedRoute>} />
        <Route path="/farmer/prices" element={<ProtectedRoute isAuthenticated={isAuthenticated}><MarketIntelligencePage role="farmer" title="Market Prices" /></ProtectedRoute>} />

        <Route path="/fpo/dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated}><FpoDashboard /></ProtectedRoute>} />
        <Route path="/fpo/farmers" element={<ProtectedRoute isAuthenticated={isAuthenticated}><FpoFarmersPage /></ProtectedRoute>} />
        <Route path="/fpo/aggregation" element={<ProtectedRoute isAuthenticated={isAuthenticated}><FpoAggregationPage /></ProtectedRoute>} />
        <Route path="/fpo/demand" element={<ProtectedRoute isAuthenticated={isAuthenticated}><FpoDemandPage /></ProtectedRoute>} />

        <Route path="/buyer/dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated}><BuyerDashboard /></ProtectedRoute>} />
        <Route path="/buyer/products" element={<ProtectedRoute isAuthenticated={isAuthenticated}><BuyerMarketplacePage /></ProtectedRoute>} />
        <Route path="/buyer/cart" element={<ProtectedRoute isAuthenticated={isAuthenticated}><BuyerCartPage /></ProtectedRoute>} />
        <Route path="/buyer/post-demand" element={<ProtectedRoute isAuthenticated={isAuthenticated}><BuyerPostDemandPage /></ProtectedRoute>} />
        <Route path="/buyer/requests" element={<ProtectedRoute isAuthenticated={isAuthenticated}><BuyerRequestsPage /></ProtectedRoute>} />
        <Route path="/buyer/matches" element={<ProtectedRoute isAuthenticated={isAuthenticated}><BuyerMatchesPage /></ProtectedRoute>} />
        <Route path="/buyer/orders" element={<ProtectedRoute isAuthenticated={isAuthenticated}><BuyerOrdersPage /></ProtectedRoute>} />
        <Route path="/buyer/track" element={<ProtectedRoute isAuthenticated={isAuthenticated}><BuyerTrackPage /></ProtectedRoute>} />
        <Route path="/buyer/wishlist" element={<ProtectedRoute isAuthenticated={isAuthenticated}><BuyerWishlistPage /></ProtectedRoute>} />
        <Route path="/buyer/farmers" element={<ProtectedRoute isAuthenticated={isAuthenticated}><BuyerFarmersPage /></ProtectedRoute>} />
        <Route path="/buyer/prices" element={<ProtectedRoute isAuthenticated={isAuthenticated}><MarketIntelligencePage role="buyer" title="Market Prices" /></ProtectedRoute>} />
        <Route path="/buyer/payments" element={<ProtectedRoute isAuthenticated={isAuthenticated}><BuyerPaymentsPage /></ProtectedRoute>} />
        <Route path="/buyer/notifications" element={<ProtectedRoute isAuthenticated={isAuthenticated}><BuyerNotificationsPage /></ProtectedRoute>} />
        <Route path="/buyer/profile" element={<ProtectedRoute isAuthenticated={isAuthenticated}><BuyerProfilePage /></ProtectedRoute>} />
        <Route path="/buyer/settings" element={<ProtectedRoute isAuthenticated={isAuthenticated}><BuyerSettingsPage /></ProtectedRoute>} />

        <Route path="/logistics/dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated}><LogisticsDashboard /></ProtectedRoute>} />
        <Route path="/logistics/routes" element={<ProtectedRoute isAuthenticated={isAuthenticated}><LogisticsRoutesPage /></ProtectedRoute>} />

        <Route path="/admin/dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AdminUsersPage /></ProtectedRoute>} />
        <Route path="/admin/market" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AdminMarketPage /></ProtectedRoute>} />
        <Route path="/admin/forecast" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AdminForecastPage /></ProtectedRoute>} />
        <Route path="/admin/matching" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AdminMatchingPage /></ProtectedRoute>} />

        <Route path="/forecast" element={<ProtectedRoute isAuthenticated={isAuthenticated}><ForecastPage /></ProtectedRoute>} />
        <Route path="/matching" element={<ProtectedRoute isAuthenticated={isAuthenticated}><MatchingPage /></ProtectedRoute>} />
        <Route path="/logistics/optimization" element={<ProtectedRoute isAuthenticated={isAuthenticated}><LogisticsOptimizationPage /></ProtectedRoute>} />
        <Route path="/market-intelligence" element={<ProtectedRoute isAuthenticated={isAuthenticated}><MarketIntelligencePage /></ProtectedRoute>} />
      </Routes>
      </BrowserRouter>
    </BuyerStoreProvider>
  );
}

export default App;