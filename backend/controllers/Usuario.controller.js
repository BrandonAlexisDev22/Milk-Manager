// controllers/userController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Función para generar token JWT
const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d' // dura 7 días
  });
};

// @desc    Registrar un nuevo usuario
// @route   POST /api/users/register
exports.register = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    const existeUsuario = await User.findOne({ email });
    if (existeUsuario) {
      return res.status(400).json({ msg: 'El email ya está registrado' });
    }

    const user = await User.create({ nombre, email, password, rol });

    res.status(201).json({
      _id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
      token: generarToken(user.id)
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// @desc    Login de usuario
// @route   POST /api/users/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    const esMatch = await user.comparePassword(password);
    if (!esMatch) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    user.ultimoAcceso = Date.now();
    await user.save();

    res.json({
      _id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
      token: generarToken(user.id)
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// @desc    Obtener perfil del usuario autenticado
// @route   GET /api/users/profile
// @access  Privado
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    res.json({
      _id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
      activo: user.activo,
      ultimoAcceso: user.ultimoAcceso
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
