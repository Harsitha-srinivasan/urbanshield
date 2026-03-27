import React from 'react';
import { Link } from 'react-router-dom';
import { Thermometer, Wind, Leaf, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="hero-title">UrbanShield</h1>
            <p className="hero-tagline">Smart Environmental Evaluation for Sustainable Buildings.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Link to="/register" className="btn btn-primary btn-lg">Start Evaluation</Link>
              <Link to="/about" className="btn btn-outline btn-lg">Learn More</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>How it Works</h2>
            <p style={{ color: '#64748b', fontSize: '1.25rem' }}>Our AI models analyze multiple factors to optimize your building's efficiency.</p>
          </div>
          
          <motion.div className="dashboard-grid" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div className="card" variants={itemVariants} style={{ background: 'linear-gradient(180deg, #fff 0%, #f0f9ff 100%)' }}>
              <div style={{ background: '#dbeafe', width: '3rem', height: '3rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#3b82f6' }}>
                <Thermometer size={24} />
              </div>
              <h3>Heat Impact</h3>
              <p style={{ color: '#64748b' }}>Analyze thermal performance and heat absorption based on materials and design.</p>
            </motion.div>

            <motion.div className="card" variants={itemVariants} style={{ background: 'linear-gradient(180deg, #fff 0%, #f0fdf4 100%)' }}>
              <div style={{ background: '#dcfce7', width: '3rem', height: '3rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#10b981' }}>
                <Wind size={24} />
              </div>
              <h3>Ventilation Quality</h3>
              <p style={{ color: '#64748b' }}>Assess airflow and indoor air quality to ensure a healthy living environment.</p>
            </motion.div>

            <motion.div className="card" variants={itemVariants} style={{ background: 'linear-gradient(180deg, #fff 0%, #fff7ed 100%)' }}>
              <div style={{ background: '#ffedd5', width: '3rem', height: '3rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#f59e0b' }}>
                <Zap size={24} />
              </div>
              <h3>Energy Efficiency</h3>
              <p style={{ color: '#64748b' }}>Calculate carbon emissions and energy consumption to reduce environmental footprint.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', background: '#0f172a', color: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: '4rem' }}>
            <div>
              <h2 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1.5rem' }}>Design for a Greener Tomorrow</h2>
              <p style={{ fontSize: '1.25rem', color: '#94a3b8', marginBottom: '2.5rem' }}>UrbanShield uses advanced algorithms to provide actionable insights for urban planners and architects, ensuring every structure contributes to a sustainable ecosystem.</p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><ShieldCheck color="#4ade80" /> <span>Compliant with modern green building standards</span></li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><Leaf color="#4ade80" /> <span>Sustainability suggestions powered by data</span></li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><Zap color="#4ade80" /> <span>Real-time impact visualizations</span></li>
              </ul>
            </div>
            <div style={{ position: 'relative' }}>
              <motion.div className="card" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                  <h3>System Status</h3>
                  <span style={{ color: '#4ade80', fontWeight: '700' }}>ONLINE</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {[1,2,3].map(i => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.1)', height: '4rem', borderRadius: '1rem', overflow: 'hidden', padding: '1rem' }}>
                      <div style={{ width: `${60 + i*10}%`, height: '0.5rem', background: '#3b82f6', borderRadius: '1rem', marginTop: '1rem' }}></div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
