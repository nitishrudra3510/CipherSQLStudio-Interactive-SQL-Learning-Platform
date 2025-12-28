import app from './app.js';
import { connectMongo } from './services/mongo.service.js';
import { testConnection } from './services/postgres.service.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    const postgresConnected = await testConnection();
    if (!postgresConnected) {
      console.warn('Warning: PostgreSQL connection failed. Some features may not work.');
    } else {
      console.log('PostgreSQL connected successfully');
    }

    await connectMongo();

    app.listen(PORT, () => {
      console.log(`🚀 CipherSQLStudio Backend running on port ${PORT}`);
      console.log(`📍 Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully...');
  process.exit(0);
});
