import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Wind, Thermometer, Building, MapPin, Layers, Layout, Leaf, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const EvaluationForm = () => {
  const [formData, setFormData] = useState({
    buildingType: 'Residential',
    area: '',
    floors: '',
    windowToWall: '',
    material: 'Mixed',
    greenCover: '',
    ventilation: 'Natural',
    temperature: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/evaluate', formData);
      navigate('/results', { state: { evaluation: response.data } });
    } catch (error) {
      console.error('Evaluation failed', error);
      alert('Error during evaluation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem' }}>Evaluate Performance</h1>
          <p style={{ color: '#64748b', fontSize: '1.25rem' }}>Input building specifications and let UrbanShield AI calculate your sustainability impact.</p>
        </header>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ padding: '3rem' }}>
          <form onSubmit={handleSubmit}>
            <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Building size={18} /> Building Type</label>
                <select name="buildingType" value={formData.buildingType} onChange={handleChange} required>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Layers size={18} /> Area (sq ft)</label>
                <input type="number" name="area" value={formData.area} onChange={handleChange} required placeholder="e.g. 1500" />
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Layout size={18} /> Number of Floors</label>
                <input type="number" name="floors" value={formData.floors} onChange={handleChange} required placeholder="e.g. 5" />
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={18} /> Window-to-Wall Ratio (%)</label>
                <input type="number" name="windowToWall" value={formData.windowToWall} onChange={handleChange} required placeholder="e.g. 30" max="100" />
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Building size={18} /> Material Type</label>
                <select name="material" value={formData.material} onChange={handleChange} required>
                  <option value="Concrete">Concrete</option>
                  <option value="Glass">Glass</option>
                  <option value="Mixed">Mixed</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Leaf size={18} /> Green Cover (%)</label>
                <input type="number" name="greenCover" value={formData.greenCover} onChange={handleChange} required placeholder="e.g. 20" max="100" />
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Wind size={18} /> Ventilation Type</label>
                <select name="ventilation" value={formData.ventilation} onChange={handleChange} required>
                  <option value="Natural">Natural</option>
                  <option value="Mechanical">Mechanical</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Thermometer size={18} /> Location Temperature (°C)</label>
                <input type="number" name="temperature" value={formData.temperature} onChange={handleChange} required placeholder="e.g. 30" />
              </div>
            </div>

            <div style={{ marginTop: '3rem', textAlign: 'right' }}>
              <button type="submit" disabled={loading} className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.125rem' }}>
                {loading ? 'Analyzing...' : (
                  <>
                    <span>Submit for Evaluation</span>
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default EvaluationForm;
