const express = require('express');
const router = express.Router();
const { Animal } = require('../models/Animal');
const { proteger } = require('../middleware/auth');
const { permisoEscritura } = require('../middleware/roles');

// Todas las rutas requieren autenticación
router.use(proteger);

// Crear un animal
router.post('/', permisoEscritura, async (req, res) => {
  try {
    const animal = new Animal(req.body);
    await animal.save();
    res.status(201).json(animal);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: 'El código de animal ya existe' 
      });
    }
    res.status(400).json({ 
      message: 'Error al crear el animal', 
      error: error.message 
    });
  }
});

// Obtener todos los animales con filtros opcionales
router.get('/', async (req, res) => {
  try {
    const { finca, estado, raza, activo } = req.query;
    const filtros = {};

    if (finca) filtros.finca = finca;
    if (estado) filtros.estado = estado;
    if (raza) filtros.raza = raza;
    if (activo !== undefined) filtros.activo = activo === 'true';

    const animales = await Animal.find(filtros)
      .populate('finca', 'nombreFinca propietario')
      .sort({ createdAt: -1 });
    
    res.json(animales);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al obtener los animales', 
      error: error.message 
    });
  }
});

// Obtener estadísticas generales
router.get('/estadisticas', async (req, res) => {
  try {
    const { finca } = req.query;
    const filtro = finca ? { finca } : {};

    const total = await Animal.countDocuments({ ...filtro, activo: true });
    const porEstado = await Animal.aggregate([
      { $match: { ...filtro, activo: true } },
      { $group: { _id: '$estado', count: { $sum: 1 } } }
    ]);
    const porRaza = await Animal.aggregate([
      { $match: { ...filtro, activo: true } },
      { $group: { _id: '$raza', count: { $sum: 1 } } }
    ]);

    res.json({
      total,
      porEstado,
      porRaza
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al obtener estadísticas', 
      error: error.message 
    });
  }
});

// Obtener un animal por ID
router.get('/:id', async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id)
      .populate('finca', 'nombreFinca propietario direccion');
    
    if (!animal) {
      return res.status(404).json({ message: 'Animal no encontrado' });
    }
    res.json(animal);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al obtener el animal', 
      error: error.message 
    });
  }
});

// Actualizar un animal por ID
router.put('/:id', permisoEscritura, async (req, res) => {
  try {
    const animal = await Animal.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!animal) {
      return res.status(404).json({ message: 'Animal no encontrado' });
    }
    res.json(animal);
  } catch (error) {
    res.status(400).json({ 
      message: 'Error al actualizar el animal', 
      error: error.message 
    });
  }
});

// Agregar registro médico
router.post('/:id/historial-medico', permisoEscritura, async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) {
      return res.status(404).json({ message: 'Animal no encontrado' });
    }

    animal.historialMedico.push(req.body);
    await animal.save();
    
    res.json(animal);
  } catch (error) {
    res.status(400).json({ 
      message: 'Error al agregar historial médico', 
      error: error.message 
    });
  }
});

// Agregar vacunación
router.post('/:id/vacunaciones', permisoEscritura, async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) {
      return res.status(404).json({ message: 'Animal no encontrado' });
    }

    animal.vacunaciones.push(req.body);
    await animal.save();
    
    res.json(animal);
  } catch (error) {
    res.status(400).json({ 
      message: 'Error al agregar vacunación', 
      error: error.message 
    });
  }
});

// Eliminar un animal (borrado lógico)
router.delete('/:id', permisoEscritura, async (req, res) => {
  try {
    const animal = await Animal.findByIdAndUpdate(
      req.params.id, 
      { activo: false }, 
      { new: true }
    );
    
    if (!animal) {
      return res.status(404).json({ message: 'Animal no encontrado' });
    }
    res.json({ 
      message: 'Animal desactivado correctamente', 
      animal 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al eliminar el animal', 
      error: error.message 
    });
  }
});

// Eliminar permanentemente
router.delete('/:id/permanente', permisoEscritura, async (req, res) => {
  try {
    const animal = await Animal.findByIdAndDelete(req.params.id);
    if (!animal) {
      return res.status(404).json({ message: 'Animal no encontrado' });
    }
    res.json({ message: 'Animal eliminado permanentemente' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al eliminar el animal', 
      error: error.message 
    });
  }
});

module.exports = router;