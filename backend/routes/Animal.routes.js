// backend/routes/animalRoutes.js
const express = require('express');
const router = express.Router();
const Animal = require('../models/Animal');

// Crear un animal
router.post('/', async (req, res) => {
  try {
    const animal = new Animal(req.body);
    await animal.save();
    res.status(201).json(animal);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el animal', error });
  }
});

// Obtener todos los animales
router.get('/', async (req, res) => {
  try {
    const animales = await Animal.find().populate('finca');
    res.json(animales);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los animales', error });
  }
});

// Obtener un animal por ID
router.get('/:id', async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id).populate('finca');
    if (!animal) {
      return res.status(404).json({ message: 'Animal no encontrado' });
    }
    res.json(animal);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el animal', error });
  }
});

// Actualizar un animal por ID
router.put('/:id', async (req, res) => {
  try {
    const animal = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!animal) {
      return res.status(404).json({ message: 'Animal no encontrado' });
    }
    res.json(animal);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el animal', error });
  }
});

// Eliminar un animal (borrado lógico -> activo = false)
router.delete('/:id', async (req, res) => {
  try {
    const animal = await Animal.findByIdAndUpdate(req.params.id, { activo: false }, { new: true });
    if (!animal) {
      return res.status(404).json({ message: 'Animal no encontrado' });
    }
    res.json({ message: 'Animal desactivado correctamente', animal });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el animal', error });
  }
});

module.exports = router;
