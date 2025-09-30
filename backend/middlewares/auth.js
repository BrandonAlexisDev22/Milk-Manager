/* global process */
const jwt = require('jsonwebtoken');
const User = require('../models/Usuario');

// Middleware para proteger rutas
exports.proteger = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Obtener token del header
      token = req.headers.authorization.split(' ')[1];

      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Obtener usuario del token
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ msg: 'Usuario no encontrado' });
      }

      if (!req.user.activo) {
        return res.status(401).json({ msg: 'Usuario inactivo' });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ msg: 'Token no válido' });
    }
  }

  if (!token) {
    return res.status(401).json({ msg: 'No autorizado, no hay token' });
  }
};

// Middleware para verificar si el usuario está autenticado (opcional)
exports.autenticado = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
    } catch (error) {
      // Si hay error, simplemente continuamos sin usuario
      req.user = null;
    }
  }

  next();
};