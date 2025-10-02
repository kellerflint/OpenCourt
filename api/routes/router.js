import { Router } from 'express';
import db from '../db/db.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ ok: true, name: 'OpenCourt API' });
});



export default router