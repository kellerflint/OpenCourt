import { Router } from 'express';
import pool from '../db/pool.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ ok: true, name: 'OpenCourt API' });
});

export default router