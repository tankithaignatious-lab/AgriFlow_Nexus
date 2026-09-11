import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin();
    navigate('/role-selection');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__intro">
          <span className="eyebrow">AgriFlow Nexus</span>
          <h2>Smart demand-to-supply orchestration</h2>
          <p>Prototype login for the AgriTech dashboard. Demo authentication is frontend-only until Django JWT is connected.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="farmer@agriflow.in" />
          </label>
          <label>
            Password
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" />
          </label>
          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
