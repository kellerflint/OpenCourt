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
    console.error("Error in /newUser:", err);

    // handle duplicate username/email
    if (
      err.name === "SequelizeUniqueConstraintError" ||
      err.code === "ER_DUP_ENTRY"
    ) {
      return res.status(400).json({
        message:
          "User already exists. Please choose a different username or email.",
      });
    }
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});


export default router;