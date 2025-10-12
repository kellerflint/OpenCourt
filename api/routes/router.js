import { Router } from 'express';
import { createUser } from '../db/userCrud.js'
const router = Router();

router.get('/', (_req, res) => {
  res.json({ ok: true, name: 'OpenCourt API' });
});

router.post("/newUser", async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const newUser = await createUser(email, username, password);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



export default router