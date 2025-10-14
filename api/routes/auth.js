import { Router } from 'express';
const router = Router();

router.get('/auth/check', (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    // return  user info
    return res.json({
      authenticated: true,
      user: {
        id: req.user.user_id ?? req.user.id,
        username: req.user.username,
        email: req.user.email
      }
    });
  }
  return res.status(401).json({ authenticated: false });
});

export default router;
