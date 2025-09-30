// routes/userRoutes.js
const express = require('express');
const {
  register,
  login,
  getProfile
} = require('../controllers/userController');

const { proteger } = require('../middleware/auth');
const { soloAdmin } = require('../middleware/roles');

const router = express.Router();

// Registrar usuario
router.post('/register', proteger, soloAdmin, register); 
// 🔒 OJO: aquí solo un admin puede registrar usuarios nuevos

// Login
router.post('/login', login);

// Perfil (usuario autenticado)
router.get('/profile', proteger, getProfile);

module.exports = router;
