import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Plus, Clock, FileText, ArrowRight, Activity, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/history');
        setHistory(response.data);
      } catch (error) {
        console.error('Failed to fetch history', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const getScoreColor = (score) => {
    if (score >= 80) return 'score-good';
    if (score >= 50) return 'score-mod';
    return 'score-poor';
  };

  return (
    <div className="container" style={{ padding: '3rem 0' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800' }}>Hello, {user?.name} 👋</h1>
          <p style={{ color: '#64748b' }}>Here’s a summary of your architectural evaluations.</p>
        </div>
        <Link to="/evaluate" className="btn btn-primary" style={{ padding: '0.875rem 1.5rem' }}>
          <Plus size={20} />
          <span>New Evaluation</span>
        </Link>
      </header>

      <div className="dashboard-grid">
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', background: 'linear-gradient(135deg, #dcfce7 0%, #fff 100%)' }}>
          <div style={{ background: '#10b981', color: '#fff', padding: '1rem', borderRadius: '1rem' }}>
            <Activity size={24} />
          </div>
          <div>
            <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Total Evaluations</p>
            <h3 style={{ fontSize: '1.75rem', fontWeight: '800' }}>{history.length}</h3>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', background: 'linear-gradient(135deg, #eff6ff 0%, #fff 100%)' }}>
          <div style={{ background: '#3b82f6', color: '#fff', padding: '1rem', borderRadius: '1rem' }}>
            <TrendingUp size={24} />
          </div>
          <div>
            <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Average Score</p>
            <h3 style={{ fontSize: '1.75rem', fontWeight: '800' }}>
              {history.length > 0 
                ? `${Math.round(history.reduce((acc, curr) => acc + curr.scores.final, 0) / history.length)}%` 
                : 'N/A'}
            </h3>
          </div>
        </div>
      </div>

      <section style={{ marginTop: '4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <Clock size={24} color="#64748b" />
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Recent History</h2>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>Loading your evaluations...</div>
        ) : history.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '5rem', border: '2px dashed #e2e8f0', background: 'transparent' }}>
            <FileText size={48} style={{ margin: '0 auto 1.5rem', color: '#94a3b8' }} />
            <h3>No evaluations yet</h3>
            <p style={{ color: '#64748b', marginBottom: '2rem' }}>Ready to analyze your first building project?</p>
            <Link to="/evaluate" className="btn btn-outline">Start First Evaluation</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {history.map((item, index) => (
              <motion.div 
                key={item.id} 
                className="card" 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: index * 0.1 }}
                style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ background: '#f1f5f9', padding: '0.75rem', borderRadius: '0.75rem' }}>
                    <FileText size={20} color="#64748b" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.125rem', fontWeight: '700' }}>{item.buildingType} Building</h4>
                    <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>{new Date(item.date).toLocaleDateString()} • {item.area} sqft</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <span className={`score-badge ${getScoreColor(item.scores.final)}`}>
                      {item.scores.final}% Sustainability
                    </span>
                  </div>
                  <button 
                    onClick={() => navigate('/results', { state: { evaluation: item } })} 
                    className="btn" 
                    style={{ background: '#f1f5f9', color: '#1e293b', width: '2.5rem', height: '2.5rem', borderRadius: '50%', padding: 0 }}
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
