import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { roleOptions } from '../data/mockData';

const RoleSelectionPage = ({ selectedRole, setSelectedRole, roleMap, isAuthenticated }) => {
  const navigate = useNavigate();

  const handleContinue = () => {
    const target = roleMap[selectedRole] || '/farmer/dashboard';
    navigate(target);
  };

  return (
    <div className="auth-page auth-page--wide">
      <div className="auth-card auth-card--wide">
        <span className="eyebrow">Select Role</span>
        <h2>Choose the dashboard you want to view</h2>
        <div className="role-grid">
          {roleOptions.map((role) => (
            <button
              key={role}
              type="button"
              className={`role-card ${selectedRole === role ? 'role-card--selected' : ''}`}
              onClick={() => setSelectedRole(role)}
            >
              <span>{role}</span>
              {selectedRole === role ? <CheckCircle2 size={18} /> : <span className="role-card__ring" />}
            </button>
          ))}
        </div>
        <div className="role-footer">
          <small>{isAuthenticated ? 'Authenticated demo user' : 'Demo session'}</small>
          <button type="button" className="button button--primary" onClick={handleContinue}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;
