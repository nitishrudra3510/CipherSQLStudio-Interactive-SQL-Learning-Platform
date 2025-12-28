import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import assignmentRoutes from './routes/assignment.routes.js';
import queryRoutes from './routes/query.routes.js';
import hintRoutes from './routes/hint.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'CipherSQLStudio API is running'
  });
});

app.use('/api/assignments', assignmentRoutes);
app.use('/api/query', queryRoutes);
app.use('/api/hint', hintRoutes);

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

export default app;
