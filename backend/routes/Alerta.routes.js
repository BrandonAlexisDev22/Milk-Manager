const express = require('express');
const router = express.Router();
const Alerta = require('../models/Alerta');

// Crear alerta
router.post('/', async (req, res) => {
  try {
    const alerta = new Alerta(req.body);
    await alerta.save();
    res.status(201).json(alerta);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear alerta', error });
  }
});

// Obtener todas las alertas
router.get('/', async (req, res) => {
  try {
    const alertas = await Alerta.find().populate('animal finca');
    res.json(alertas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener alertas', error });
  }
});

// Obtener una alerta por ID
router.get('/:id', async (req, res) => {
  try {
    const alerta = await Alerta.findById(req.params.id).populate('animal finca');
    if (!alerta) return res.status(404).json({ message: 'Alerta no encontrada' });
    res.json(alerta);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la alerta', error });
  }
});

// Actualizar alerta por ID
router.put('/:id', async (req, res) => {
  try {
    const alerta = await Alerta.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!alerta) return res.status(404).json({ message: 'Alerta no encontrada' });
    res.json(alerta);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar la alerta', error });
  }
});

// Eliminar alerta por ID
router.delete('/:id', async (req, res) => {
  try {
    const alerta = await Alerta.findByIdAndDelete(req.params.id);
    if (!alerta) return res.status(404).json({ message: 'Alerta no encontrada' });
    res.json({ message: 'Alerta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la alerta', error });
  }
});

// Marcar alerta como leída
router.patch('/:id/leida', async (req, res) => {
  try {
    const alerta = await Alerta.findByIdAndUpdate(
      req.params.id,
      { leida: true },
      { new: true }
    );
    if (!alerta) return res.status(404).json({ message: 'Alerta no encontrada' });
    res.json(alerta);
  } catch (error) {
    res.status(500).json({ message: 'Error al marcar la alerta como leída', error });
  }
});

module.exports = router;
