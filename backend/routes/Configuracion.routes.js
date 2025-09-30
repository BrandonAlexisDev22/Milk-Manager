// backend/routes/configuracionRoutes.js
const express = require('express');
const router = express.Router();
const Configuracion = require('../models/Configuracion');

// Crear configuración de finca
router.post('/', async (req, res) => {
  try {
    const configuracion = new Configuracion(req.body);
    await configuracion.save();
    res.status(201).json(configuracion);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear la configuración', error });
  }
});

// Obtener todas las configuraciones
router.get('/', async (req, res) => {
  try {
    const configuraciones = await Configuracion.find();
    res.json(configuraciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las configuraciones', error });
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
    res.status(500).json({ message: 'Error al obtener la configuración', error });
  }
});

// Actualizar configuración por ID
router.put('/:id', async (req, res) => {
  try {
    const configuracion = await Configuracion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!configuracion) {
      return res.status(404).json({ message: 'Configuración no encontrada' });
    }
    res.json(configuracion);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar la configuración', error });
  }
});

// Eliminar configuración
router.delete('/:id', async (req, res) => {
  try {
    const configuracion = await Configuracion.findByIdAndDelete(req.params.id);
    if (!configuracion) {
      return res.status(404).json({ message: 'Configuración no encontrada' });
    }
    res.json({ message: 'Configuración eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la configuración', error });
  }
});

module.exports = router;
