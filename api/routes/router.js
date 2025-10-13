import { Router } from 'express';
import { createUser } from '../db/userCrud.js'
import {User} from "../model/user.js";
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

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const record = await User.findOne({ where: { email } });

    if (!record) {
      return res.status(401).json({ message: "No account found with that email." });
    }

    
    if (record.password !== password) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    console.log("Logged in:", record.username);

    return res.status(200).json({
      message: "Login successful!",
      user: {
        id: record.user_id ?? record.id,
        username: record.username,
        email: record.email,
      },
    });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
});


export default router;