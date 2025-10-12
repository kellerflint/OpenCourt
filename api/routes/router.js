import { Router } from 'express';
import db from '../db/db.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({ ok: true, name: 'OpenCourt API' });
});

router.get('/new', (_req, res) => {

    res.render('new_entry_form', { title: 'New Submission Form' });
});

router.get('/products/all', getAllcourts);

router.post('/post', (req, res) => {
  
})



export default router