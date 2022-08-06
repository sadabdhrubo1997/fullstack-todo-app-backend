import dotenv from 'dotenv';
dotenv.config();

const { NODE_ENV, PORT, JWT_SECRET, MONGO_URI, FRONTEND_URL } = process.env;

const config = Object.freeze({
  environment: NODE_ENV || 'dev',
  port: Number(PORT) || 8080,
  jwtSecret: JWT_SECRET || '',
  mongoURI: MONGO_URI || '',
  frontendURL: FRONTEND_URL || 'https://localhost:3002',
});

export default config;
