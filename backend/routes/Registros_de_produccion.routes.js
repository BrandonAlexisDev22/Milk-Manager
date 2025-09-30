// backend/routes/produccionRoutes.js
const express = require('express');
const router = express.Router();
const Produccion = require('../models/Produccion');

// Crear registro de producción
router.post('/', async (req, res) => {
  try {
    const produccion = new Produccion(req.body);
    await produccion.save();
    res.status(201).json(produccion);
  } catch (error) {
    res.status(400).json({ message: 'Error al registrar la producción', error });
  }
});

// Obtener todos los registros de producción
router.get('/', async (req, res) => {
  try {
    const producciones = await Produccion.find()
      .populate('animal', 'codigo nombre raza')
      .populate('registradoPor', 'nombre email')
      .populate('finca', 'nombreFinca propietario');
    res.json(producciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener producciones', error });
  }
});

// Obtener producción por ID
router.get('/:id', async (req, res) => {
  try {
    const produccion = await Produccion.findById(req.params.id)
      .populate('animal', 'codigo nombre raza')
      .populate('registradoPor', 'nombre email')
      .populate('finca', 'nombreFinca propietario');
    if (!produccion) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }
    res.json(produccion);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la producción', error });
  }
});

// Actualizar registro
router.put('/:id', async (req, res) => {
  try {
    const produccion = await Produccion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!produccion) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }
    res.json(produccion);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar la producción', error });
  }
});

// Eliminar registro
router.delete('/:id', async (req, res) => {
  try {
    const produccion = await Produccion.findByIdAndDelete(req.params.id);
    if (!produccion) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }
    res.json({ message: 'Producción eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la producción', error });
  }
});

// Obtener producción por periodo
router.get('/periodo/:inicio/:fin', async (req, res) => {
  try {
    const fechaInicio = new Date(req.params.inicio);
    const fechaFin = new Date(req.params.fin);
    const resultado = await Produccion.getProduccionPorPeriodo(fechaInicio, fechaFin);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener producción por periodo', error });
  }
});

module.exports = router;
