const express = require('express');
const router = express.Router();
const { Configuracion } = require('../models/Configuracion');
const { proteger } = require('../middleware/auth');
const { soloAdmin, permisoEscritura } = require('../middleware/roles');

// Todas las rutas requieren autenticación
router.use(proteger);

// Crear configuración de finca (solo admin)
router.post('/', soloAdmin, async (req, res) => {
  try {
    const configuracion = new Configuracion(req.body);
    await configuracion.save();
    res.status(201).json(configuracion);
  } catch (error) {
    res.status(400).json({ 
      message: 'Error al crear la configuración', 
      error: error.message 
    });
  }
});

// Obtener todas las configuraciones
router.get('/', async (req, res) => {
  try {
    const configuraciones = await Configuracion.find().sort({ createdAt: -1 });
    res.json(configuraciones);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al obtener las configuraciones', 
      error: error.message 
    });
  }
});

// Obtener una configuración por ID
router.get('/:id', async (req, res) => {
  try {
    const configuracion = await Configuracion.findById(req.params.id);
    if (!configuracion) {
      return res.status(404).json({ message: 'Configuración no encontrada' });
    }
    res.json(configuracion);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al obtener la configuración', 
      error: error.message 
    });
  }
});

// Actualizar configuración por ID
router.put('/:id', permisoEscritura, async (req, res) => {
  try {
    const configuracion = await Configuracion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!configuracion) {
      return res.status(404).json({ message: 'Configuración no encontrada' });
    }
    res.json(configuracion);
  } catch (error) {
    res.status(400).json({ 
      message: 'Error al actualizar la configuración', 
      error: error.message 
    });
  }
});

// Actualizar solo notificaciones
router.patch('/:id/notificaciones', permisoEscritura, async (req, res) => {
  try {
    const configuracion = await Configuracion.findByIdAndUpdate(
      req.params.id,
      { notificaciones: req.body },
      { new: true }
    );
    
    if (!configuracion) {
      return res.status(404).json({ message: 'Configuración no encontrada' });
    }
    res.json(configuracion);
  } catch (error) {
    res.status(400).json({ 
      message: 'Error al actualizar notificaciones', 
      error: error.message 
    });
  }
});

// Actualizar solo horarios
router.patch('/:id/horarios', permisoEscritura, async (req, res) => {
  try {
    const configuracion = await Configuracion.findByIdAndUpdate(
      req.params.id,
      { horarios: req.body },
      { new: true }
    );
    
    if (!configuracion) {
      return res.status(404).json({ message: 'Configuración no encontrada' });
    }
    res.json(configuracion);
  } catch (error) {
    res.status(400).json({ 
      message: 'Error al actualizar horarios', 
      error: error.message 
    });
  }
});

// Registrar backup
router.post('/:id/backup', permisoEscritura, async (req, res) => {
  try {
    const configuracion = await Configuracion.findByIdAndUpdate(
      req.params.id,
      { ultimoBackup: new Date() },
      { new: true }
    );
    
    if (!configuracion) {
      return res.status(404).json({ message: 'Configuración no encontrada' });
    }
    res.json({ 
      message: 'Backup registrado correctamente', 
      ultimoBackup: configuracion.ultimoBackup 
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Error al registrar backup', 
      error: error.message 
    });
  }
});

// Eliminar configuración (solo admin)
router.delete('/:id', soloAdmin, async (req, res) => {
  try {
    const configuracion = await Configuracion.findByIdAndDelete(req.params.id);
    if (!configuracion) {
      return res.status(404).json({ message: 'Configuración no encontrada' });
    }
    res.json({ message: 'Configuración eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al eliminar la configuración', 
      error: error.message 
    });
  }
});

module.exports = router;