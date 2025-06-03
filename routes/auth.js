import { Router } from 'express';
import validateAuthBody from '../middlewares/validateAuthBody.js';
import { checkIfUsernameExists, registerUser } from '../services/users.js';

const router = Router();

// LOGIN
router.post('/login', validateAuthBody, async (req, res, next) => {
  const { username, password } = req.body;
  const user = await checkIfUsernameExists(username);

  if (user && user.password === password) {
    global.user = user;
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        userId: user.userId,
        username: user.username,
      },
    });
  } else {
    next({
      status: 401,
      message: 'Wrong username or password',
    });
  }
});

// REGISTER
router.post('/register', validateAuthBody, async (req, res, next) => {
  const { username, password } = req.body;
  const isUsernameTaken = await checkIfUsernameExists(username);

  if (isUsernameTaken) {
    next({
      status: 409,
      message: 'Username already taken',
    });
  }

  const newUser = await registerUser(username, password);

  if (newUser) {
    res.status(201).json({
      success: true,
      message: 'Registration successful!',
      user: {
        username,
        userId: newUser.userId,
      },
    });
  } else {
    next({
      status: 500,
      message: 'Could not register new user',
    });
  }
});

// LOGOUT
router.get('/logout', (_req, res) => {
  global.user = null;
  res.json({
    success: true,
    message: 'Logged out successfully',
  });
});

export default router;
