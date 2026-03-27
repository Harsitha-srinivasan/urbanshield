const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const { v4: uuidv4 } = require('uuid');

const app = express();
const adapter = new FileSync('db.json');
const db = low(adapter);

// Initial database structure
db.defaults({ users: [], evaluations: [] }).write();

app.use(cors());
app.use(bodyParser.json());

const SECRET_KEY = 'urbanshield_secret_key';

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(0);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(0);
    req.user = user;
    next();
  });
};

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = db.get('users').find({ email }).value();
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: uuidv4(), name, email, password: hashedPassword };
  db.get('users').push(newUser).write();

  const token = jwt.sign({ id: newUser.id, name: newUser.name }, SECRET_KEY);
  res.json({ token, user: { id: newUser.id, name: newUser.name, email: newUser.email } });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = db.get('users').find({ email }).value();
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, name: user.name }, SECRET_KEY);
  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

// Evaluation Routes
app.post('/api/evaluate', authenticateToken, (req, res) => {
  const { buildingType, area, floors, windowToWall, material, greenCover, ventilation, temperature } = req.body;
  
  // Evaluation Logic
  let heatScore = 100 - (temperature - 20) * 2 - (windowToWall * 0.5) + (greenCover * 0.3);
  let ventilationScore = ventilation === 'Natural' ? 85 : 70;
  if (windowToWall > 30) ventilationScore += 5;
  
  let carbonScore = 100 - (area / 100) - (floors * 2);
  if (material === 'Concrete') carbonScore -= 10;
  if (material === 'Glass') carbonScore -= 15;
  if (material === 'Mixed') carbonScore -= 5;

  heatScore = Math.min(Math.max(heatScore, 0), 100);
  ventilationScore = Math.min(Math.max(ventilationScore, 0), 100);
  carbonScore = Math.min(Math.max(carbonScore, 0), 100);

  const finalScore = (heatScore * 0.4) + (ventilationScore * 0.3) + (carbonScore * 0.3);

  // Suggestions
  const suggestions = [];
  if (heatScore < 60) suggestions.push('Increase green cover around the building.', 'Consider cool-roofing materials.');
  if (ventilationScore < 60) suggestions.push('Improve window placement for better natural airflow.', 'Add cross-ventilation features.');
  if (carbonScore < 60) suggestions.push('Switch to low-carbon sustainable materials.', 'Integrate solar energy or rooftop gardens.');
  if (suggestions.length === 0) suggestions.push('Continue maintaining high sustainability standards.');

  const evaluation = {
    id: uuidv4(),
    userId: req.user.id,
    date: new Date().toISOString(),
    buildingType,
    area,
    floors,
    windowToWall,
    material,
    greenCover,
    ventilation,
    temperature,
    scores: {
      heat: Math.round(heatScore),
      ventilation: Math.round(ventilationScore),
      carbon: Math.round(carbonScore),
      final: Math.round(finalScore)
    },
    suggestions
  };

  db.get('evaluations').push(evaluation).write();
  res.json(evaluation);
});

app.get('/api/history', authenticateToken, (req, res) => {
  const userEvaluations = db.get('evaluations').filter({ userId: req.user.id }).sortBy('date').reverse().value();
  res.json(userEvaluations);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
