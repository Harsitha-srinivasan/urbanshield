import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Mail, Lock, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await register(name, email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 1rem' }}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card" style={{ maxWidth: '450px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ background: '#dcfce7', width: '4rem', height: '4rem', borderRadius: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#10b981' }}>
            <UserPlus size={32} />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>Create Account</h2>
          <p style={{ color: '#64748b' }}>Join UrbanShield to evaluate your building performance.</p>
        </div>

        {error && <div style={{ background: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '0.75rem', marginBottom: '1.5rem', fontWeight: '500' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label>Full Name</label>
            <div style={{ position: 'relative' }}>
              <User style={{ position: 'absolute', left: '1rem', top: '1rem', color: '#94a3b8' }} size={20} />
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Full Name" style={{ paddingLeft: '3rem' }} />
            </div>
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail style={{ position: 'absolute', left: '1rem', top: '1rem', color: '#94a3b8' }} size={20} />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" style={{ paddingLeft: '3rem' }} />
            </div>
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock style={{ position: 'absolute', left: '1rem', top: '1rem', color: '#94a3b8' }} size={20} />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" style={{ paddingLeft: '3rem' }} />
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '2rem', color: '#64748b' }}>
          Already have an account? <Link to="/login" style={{ color: '#10b981', fontWeight: '700' }}>Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
