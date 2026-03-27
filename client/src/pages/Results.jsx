import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Share2, Download, RefreshCcw, CheckCircle, AlertTriangle, TrendingDown, Thermometer, Wind, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { evaluation } = location.state || {};

  if (!evaluation) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h2>No evaluation results found</h2>
        <Link to="/evaluate" className="btn btn-primary" style={{ marginTop: '2rem' }}>Start New Evaluation</Link>
      </div>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  };

  const getScoreClass = (score) => {
    if (score >= 80) return 'score-good';
    if (score >= 50) return 'score-mod';
    return 'score-poor';
  };

  const pieData = {
    labels: ['Heat Impact', 'Ventilation', 'Carbon Footprint'],
    datasets: [{
      data: [evaluation.scores.heat, evaluation.scores.ventilation, evaluation.scores.carbon],
      backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
      borderWidth: 0,
    }]
  };

  const barData = {
    labels: ['Performance (%)'],
    datasets: [
      {
        label: 'Heat',
        data: [evaluation.scores.heat],
        backgroundColor: '#3b82f6',
      },
      {
        label: 'Ventilation',
        data: [evaluation.scores.ventilation],
        backgroundColor: '#10b981',
      },
      {
        label: 'Carbon',
        data: [evaluation.scores.carbon],
        backgroundColor: '#f59e0b',
      }
    ]
  };

  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800' }}>Evaluation Results</h1>
            <p style={{ color: '#64748b' }}>Detailed sustainability report for your project.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-outline"><Share2 size={20} /> Share Report</button>
            <button className="btn btn-primary" onClick={() => window.print()}><Download size={20} /> Download PDF</button>
          </div>
        </header>

        <div className="dashboard-grid">
          <div className="card" style={{ textAlign: 'center', gridColumn: 'span 2' }}>
            <div style={{ margin: '0 auto', width: '250px', height: '250px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Pie data={pieData} options={{ maintainAspectRatio: false }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', background: '#fff', borderRadius: '50%', padding: '2rem' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: '800', color: getScoreColor(evaluation.scores.final) }}>{evaluation.scores.final}%</span>
                <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#64748b' }}>SCORE</p>
              </div>
            </div>
            <div style={{ marginTop: '2.5rem' }}>
              <span className={`score-badge ${getScoreClass(evaluation.scores.final)}`} style={{ fontSize: '1.25rem', padding: '1rem 2.5rem' }}>
                {evaluation.scores.final >= 80 ? 'EXCELLENT' : evaluation.scores.final >= 50 ? 'MODERATE' : 'POOR'}
              </span>
              <p style={{ marginTop: '1.5rem', color: '#64748b', fontSize: '1.125rem' }}>Your project is {evaluation.scores.final}% sustainable according to UrbanShield criteria.</p>
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><TrendingDown size={24} color="#3b82f6" /> Breakdown</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Thermometer size={18} color="#3b82f6" /> <span>Heat Impact</span></div>
                <span style={{ fontWeight: '700' }}>{evaluation.scores.heat}%</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Wind size={18} color="#10b981" /> <span>Ventilation</span></div>
                <span style={{ fontWeight: '700' }}>{evaluation.scores.ventilation}%</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Leaf size={18} color="#f59e0b" /> <span>Carbon Emission</span></div>
                <span style={{ fontWeight: '700' }}>{evaluation.scores.carbon}%</span>
              </div>
            </div>
            <div style={{ height: '200px', marginTop: '2rem' }}>
              <Bar data={barData} options={{ maintainAspectRatio: false, scales: { y: { min: 0, max: 100 } } }} />
            </div>
          </div>
        </div>

        <section style={{ marginTop: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <Leaf size={24} color="#10b981" />
            <h2 style={{ fontSize: '1.75rem', fontWeight: '700' }}>AI Sustainability Suggestions</h2>
          </div>

          <div className="dashboard-grid">
            {evaluation.suggestions.map((suggestion, index) => (
              <motion.div 
                key={index} 
                className="card" 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: index * 0.1 }}
                style={{ borderLeft: '4px solid #10b981', background: '#f0fdf4' }}
              >
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ background: '#dcfce7', color: '#10b981', padding: '0.5rem', borderRadius: '0.5rem' }}>
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: '700', marginBottom: '0.5rem' }}>Improvement #{index + 1}</h4>
                    <p style={{ color: '#064e3b' }}>{suggestion}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
          <button className="btn btn-outline" onClick={() => navigate('/evaluate')} style={{ padding: '1rem 3rem' }}><RefreshCcw size={20} /> Evaluate New Design</button>
        </div>
      </motion.div>
    </div>
  );
};

export default Results;
