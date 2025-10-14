import { Router } from 'express';
import { createUser } from '../db/userCrud.js'
import {User} from "../model/user.js";
import passport from '../services/passport.js';   
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

// LOGIN using passport local strategy and create a session
router.post("/login", (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info?.message || "Invalid credentials" });

    req.login(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({
        message: "Login successful!",
        user: {
          id: user.user_id ?? user.id,
          username: user.username,
          email: user.email,
        },
      });
    });
  })(req, res, next);
});


export default router;