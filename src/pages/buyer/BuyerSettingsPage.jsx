import { useEffect, useState } from 'react';
import { Bell, Check, Clipboard, LockKeyhole, LogOut, Moon, Palette, RotateCcw, Save, ShieldCheck, ShoppingCart, Sun, Trash2, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import { useBuyerStore } from '../../hooks/useBuyerStore';

const Toggle = ({ label, description, checked, onChange }) => (
  <label className="settings-toggle-row">
    <span><strong>{label}</strong><small>{description}</small></span>
    <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
    <span className="settings-switch" aria-hidden="true"><span /></span>
  </label>
);

const BuyerSettingsPage = () => {
  const navigate = useNavigate();
  const { settings, setSettings, clearCart, clearWishlist, resetSettings } = useBuyerStore();
  const [draft, setDraft] = useState(settings);
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: '', next: '', confirm: '' });
  const [passwordMessage, setPasswordMessage] = useState('');

  useEffect(() => setDraft(settings), [settings]);
  const updateSection = (section, field, value) => setDraft((current) => ({ ...current, [section]: { ...current[section], [field]: value } }));
  const saveSettings = () => { setSettings(draft); setFeedback({ type: 'success', message: 'Your buyer settings were saved successfully.' }); };
  const resetChanges = () => { setDraft(settings); setFeedback({ type: 'success', message: 'Unsaved changes were discarded.' }); };
  const resetAllSettings = () => { if (!window.confirm('Reset all buyer settings to their defaults?')) return; resetSettings(); setFeedback({ type: 'success', message: 'Buyer settings were reset to their defaults.' }); };
  const clearData = (label, action) => { if (!window.confirm(`Clear your ${label}? This cannot be undone.`)) return; action(); setFeedback({ type: 'success', message: `${label[0].toUpperCase()}${label.slice(1)} cleared.` }); };
  const updateTheme = (theme) => { setDraft((current) => ({ ...current, theme })); setSettings((current) => ({ ...current, theme })); setFeedback({ type: 'success', message: `${theme === 'dark' ? 'Dark' : 'Light'} mode enabled.` }); };
  const changePassword = (event) => { event.preventDefault(); if (!passwordForm.current || !passwordForm.next || !passwordForm.confirm) { setPasswordMessage('Complete all password fields for this local demo.'); return; } if (passwordForm.next !== passwordForm.confirm) { setPasswordMessage('New password and confirmation do not match.'); return; } setPasswordMessage('Demo password updated locally. No server password was changed.'); setPasswordForm({ current: '', next: '', confirm: '' }); };
  const logout = () => { if (window.confirm('Log out of the demo session?')) navigate('/login'); };
  const field = (section, name, label, type = 'text') => <label className="settings-field">{label}<input type={type} value={draft[section][name]} onChange={(event) => updateSection(section, name, event.target.value)} /></label>;

  return <DashboardLayout role="buyer" title="Settings">
    <div className="settings-page">
      <section className="settings-hero"><div><span className="eyebrow">Buyer preferences</span><h2>Settings that fit your workflow</h2><p>Manage your account, delivery defaults, notifications, privacy, and local demo data.</p></div><div className="settings-hero-icon"><Palette size={24} /></div></section>
      {feedback.message && <div className={`settings-feedback settings-feedback--${feedback.type}`} role="status"><Check size={17} /> {feedback.message}</div>}

      <section className="section-block settings-section"><div className="settings-section-heading"><div><span className="settings-section-icon"><UserCircle size={18} /></span><div><h3>Account settings</h3><p className="muted-text">Keep your buyer contact details current.</p></div></div><Button onClick={saveSettings}><Save size={16} /> Save Changes</Button></div><div className="settings-form-grid">{field('profile', 'name', 'Buyer name')}{field('profile', 'email', 'Email', 'email')}{field('profile', 'phone', 'Phone number', 'tel')}</div></section>

      <section className="section-block settings-section"><div className="settings-section-heading"><div><span className="settings-section-icon"><Clipboard size={18} /></span><div><h3>Delivery settings</h3><p className="muted-text">Use these details as the default checkout destination.</p></div></div><Button variant="secondary" onClick={saveSettings}><Save size={16} /> Save Address</Button></div><div className="settings-form-grid settings-form-grid--address">{field('address', 'address', 'Default delivery address')}{field('address', 'city', 'City')}{field('address', 'state', 'State')}{field('address', 'pincode', 'PIN code')}</div></section>

      <section className="section-block settings-section"><div className="settings-section-heading"><div><span className="settings-section-icon"><Bell size={18} /></span><div><h3>Notification settings</h3><p className="muted-text">Choose which buyer updates you want to receive.</p></div></div></div><div className="settings-toggle-list"><Toggle label="Order updates" description="Confirmation and payment updates" checked={draft.notifications.orderUpdates} onChange={(value) => updateSection('notifications', 'orderUpdates', value)} /><Toggle label="Delivery updates" description="Packing, dispatch and tracking updates" checked={draft.notifications.deliveryUpdates} onChange={(value) => updateSection('notifications', 'deliveryUpdates', value)} /><Toggle label="Buyer request updates" description="Responses and offers on your requests" checked={draft.notifications.requestUpdates} onChange={(value) => updateSection('notifications', 'requestUpdates', value)} /><Toggle label="New product notifications" description="New farmer listings matching your interests" checked={draft.notifications.newProducts} onChange={(value) => updateSection('notifications', 'newProducts', value)} /><Toggle label="Market price notifications" description="Reference price movement alerts" checked={draft.notifications.marketPrices} onChange={(value) => updateSection('notifications', 'marketPrices', value)} /><Toggle label="Promotional notifications" description="Optional marketplace promotions" checked={draft.notifications.promotions} onChange={(value) => updateSection('notifications', 'promotions', value)} /></div></section>

      <div className="settings-two-column"><section className="section-block settings-section"><div className="settings-section-heading"><div><span className="settings-section-icon"><ShieldCheck size={18} /></span><div><h3>Privacy settings</h3><p className="muted-text">Control how this demo personalizes your experience.</p></div></div></div><div className="settings-toggle-list"><Toggle label="Remember me" description="Keep your demo preference between visits" checked={draft.privacy.rememberMe} onChange={(value) => updateSection('privacy', 'rememberMe', value)} /><Toggle label="Show online status" description="Allow active status to be shown" checked={draft.privacy.activeStatus} onChange={(value) => updateSection('privacy', 'activeStatus', value)} /><Toggle label="Personalized recommendations" description="Use your activity to improve suggestions" checked={draft.privacy.recommendations} onChange={(value) => updateSection('privacy', 'recommendations', value)} /></div></section><section className="section-block settings-section"><div className="settings-section-heading"><div><span className="settings-section-icon"><Palette size={18} /></span><div><h3>Appearance</h3><p className="muted-text">Theme applies across the buyer dashboard.</p></div></div></div><div className="theme-choice-grid"><button className={`theme-choice ${draft.theme === 'light' ? 'theme-choice--active' : ''}`} onClick={() => updateTheme('light')}><Sun size={19} /><span>Light mode</span><small>Bright and clear</small></button><button className={`theme-choice ${draft.theme === 'dark' ? 'theme-choice--active' : ''}`} onClick={() => updateTheme('dark')}><Moon size={19} /><span>Dark mode</span><small>Low-light friendly</small></button></div><label className="settings-field settings-language">Language<select value={draft.language} onChange={(event) => setDraft((current) => ({ ...current, language: event.target.value }))}><option>English</option><option>Tamil</option><option>Telugu</option></select></label></section></div>

      <section className="section-block settings-section"><div className="settings-section-heading"><div><span className="settings-section-icon"><LockKeyhole size={18} /></span><div><h3>Security</h3><p className="muted-text">Password changes are handled locally in this frontend demo.</p></div></div></div><div className="settings-action-row"><Button variant="secondary" onClick={() => { setPasswordMessage(''); setPasswordOpen(true); }}><LockKeyhole size={16} /> Change Password</Button><Button variant="ghost" onClick={logout}><LogOut size={16} /> Logout</Button></div><small className="settings-demo-note">Session: authenticated demo user · Server authentication is not connected.</small></section>

      <section className="section-block settings-section"><div className="settings-section-heading"><div><span className="settings-section-icon"><Trash2 size={18} /></span><div><h3>Data management</h3><p className="muted-text">Remove local buyer data without affecting farmer data.</p></div></div></div><div className="settings-action-row"><Button variant="ghost" onClick={() => clearData('cart', clearCart)}><ShoppingCart size={16} /> Clear Cart</Button><Button variant="ghost" onClick={() => clearData('wishlist', clearWishlist)}><Trash2 size={16} /> Clear Wishlist</Button><Button variant="ghost" onClick={resetAllSettings}><RotateCcw size={16} /> Reset Buyer Settings</Button></div></section>

      <div className="settings-footer-actions"><Button variant="ghost" onClick={resetChanges}>Reset Changes</Button><Button onClick={saveSettings}><Save size={16} /> Save Changes</Button></div>
    </div>
    <Modal isOpen={passwordOpen} onClose={() => setPasswordOpen(false)} title="Change Password"><form className="settings-password-form" onSubmit={changePassword}><p className="muted-text">Demo only: your password is not sent to a server.</p><label className="settings-field">Current password<input type="password" value={passwordForm.current} onChange={(event) => setPasswordForm({ ...passwordForm, current: event.target.value })} /></label><label className="settings-field">New password<input type="password" value={passwordForm.next} onChange={(event) => setPasswordForm({ ...passwordForm, next: event.target.value })} /></label><label className="settings-field">Confirm new password<input type="password" value={passwordForm.confirm} onChange={(event) => setPasswordForm({ ...passwordForm, confirm: event.target.value })} /></label>{passwordMessage && <p className="settings-password-message">{passwordMessage}</p>}<div className="produce-form__actions"><Button variant="ghost" onClick={() => setPasswordOpen(false)}>Cancel</Button><Button type="submit">Save Password</Button></div></form></Modal>
  </DashboardLayout>;
};

export default BuyerSettingsPage;
