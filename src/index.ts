// src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes';
import test from 'node:test';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/test', authRoutes);
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
