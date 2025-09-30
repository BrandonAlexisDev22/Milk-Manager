// backend/routes/reporteRoutes.js
const express = require('express');
const router = express.Router();
const Reporte = require('../models/Reporte');

// Crear reporte
router.post('/', async (req, res) => {
  try {
    const reporte = new Reporte(req.body);
    await reporte.save();
    res.status(201).json(reporte);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el reporte', error });
  }
});

// Obtener todos los reportes
router.get('/', async (req, res) => {
  try {
    const reportes = await Reporte.find()
      .populate('generadoPor', 'nombre email')
      .populate('finca', 'nombreFinca propietario');
    res.json(reportes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener reportes', error });
  }
});

// Obtener reporte por ID
router.get('/:id', async (req, res) => {
  try {
    const reporte = await Reporte.findById(req.params.id)
      .populate('generadoPor', 'nombre email')
      .populate('finca', 'nombreFinca propietario');
    if (!reporte) {
      return res.status(404).json({ message: 'Reporte no encontrado' });
    }
    res.json(reporte);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el reporte', error });
  }
});

// Actualizar reporte
router.put('/:id', async (req, res) => {
  try {
    const reporte = await Reporte.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!reporte) {
      return res.status(404).json({ message: 'Reporte no encontrado' });
    }
    res.json(reporte);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el reporte', error });
  }
});

// Eliminar reporte
router.delete('/:id', async (req, res) => {
  try {
    const reporte = await Reporte.findByIdAndDelete(req.params.id);
    if (!reporte) {
      return res.status(404).json({ message: 'Reporte no encontrado' });
    }
    res.json({ message: 'Reporte eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el reporte', error });
  }
});

// Obtener reportes por tipo
router.get('/tipo/:tipo', async (req, res) => {
  try {
    const reportes = await Reporte.find({ tipo: req.params.tipo })
      .populate('generadoPor', 'nombre email')
      .populate('finca', 'nombreFinca propietario');
    res.json(reportes);
  } catch (error) {
    res.status(500).json({ message: 'Error al filtrar reportes', error });
  }
});

// Obtener reportes por periodo
router.get('/periodo/:inicio/:fin', async (req, res) => {
  try {
    const fechaInicio = new Date(req.params.inicio);
    const fechaFin = new Date(req.params.fin);
    const reportes = await Reporte.find({
      'periodo.fechaInicio': { $gte: fechaInicio },
      'periodo.fechaFin': { $lte: fechaFin }
    })
      .populate('generadoPor', 'nombre email')
      .populate('finca', 'nombreFinca propietario');
    res.json(reportes);
  } catch (error) {
    res.status(500).json({ message: 'Error al filtrar reportes por periodo', error });
  }
});

module.exports = router;
