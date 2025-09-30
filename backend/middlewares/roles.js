// Middleware para verificar rol de administrador
exports.soloAdmin = (req, res, next) => {
  if (req.user && req.user.rol === 'Administrador') {
    next();
  } else {
    res.status(403).json({ 
      msg: 'Acceso denegado. Se requiere rol de Administrador' 
    });
  }
};

// Middleware para verificar roles múltiples
exports.verificarRol = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ msg: 'No autenticado' });
    }

    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({ 
        msg: `Acceso denegado. Se requiere uno de los siguientes roles: ${roles.join(', ')}` 
      });
    }

    next();
  };
};

// Middleware para roles con permisos de escritura
exports.permisoEscritura = (req, res, next) => {
  const rolesPermitidos = ['Administrador', 'Operador', 'Veterinario'];
  
  if (req.user && rolesPermitidos.includes(req.user.rol)) {
    next();
  } else {
    res.status(403).json({ 
      msg: 'No tienes permisos para realizar esta acción' 
    });
  }
};