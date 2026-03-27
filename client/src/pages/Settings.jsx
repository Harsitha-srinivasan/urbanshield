import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, LogOut, Bell, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const Settings = () => {
  const { user, logout } = useAuth();

  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem' }}>Settings</h1>
        <p style={{ color: '#64748b', fontSize: '1.25rem' }}>Manage your profile and application preferences.</p>
      </header>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ padding: '3rem' }}>
          <section style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><User size={24} color="#3b82f6" /> Profile Details</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ background: '#dbeafe', color: '#3b82f6', width: '5rem', height: '5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: '800' }}>
                  {user?.name?.charAt(0)}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800' }}>{user?.name}</h3>
                  <p style={{ color: '#64748b' }}>Account ID: {user?.id}</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                  <label>Full Name</label>
                  <input type="text" value={user?.name} readOnly style={{ background: '#f8fafc' }} />
                </div>
                <div>
                  <label>Email Address</label>
                  <input type="email" value={user?.email} readOnly style={{ background: '#f8fafc' }} />
                </div>
              </div>
              <button className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '0.75rem 2rem' }}>Update Profile</button>
            </div>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Shield size={24} color="#10b981" /> Application Settings</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem', background: '#f8fafc', borderRadius: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: '#fff', padding: '0.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}><Bell size={20} color="#64748b" /></div>
                  <div>
                    <h4 style={{ fontWeight: '700' }}>Email Notifications</h4>
                    <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Get report summaries in your inbox.</p>
                  </div>
                </div>
                <input type="checkbox" defaultChecked style={{ width: 'auto', marginBottom: 0 }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem', background: '#f8fafc', borderRadius: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: '#fff', padding: '0.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}><Moon size={20} color="#64748b" /></div>
                  <div>
                    <h4 style={{ fontWeight: '700' }}>Dark Mode</h4>
                    <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Toggle between light and dark themes.</p>
                  </div>
                </div>
                <input type="checkbox" style={{ width: 'auto', marginBottom: 0 }} />
              </div>
            </div>
          </section>

          <div style={{ marginTop: '4rem', borderTop: '1px solid #e2e8f0', paddingTop: '3rem', textAlign: 'center' }}>
            <button onClick={logout} className="btn btn-outline" style={{ borderColor: '#ef4444', color: '#ef4444', padding: '1rem 3rem' }}>
              <LogOut size={20} />
              <span>Log Out of UrbanShield</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
