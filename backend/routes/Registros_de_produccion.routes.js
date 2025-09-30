const express = require('express');
const router = express.Router();
const { Produccion } = require('../models/Registro_de_produccion');
const { Animal } = require('../models/Animal');
const { proteger } = require('../middleware/auth');
const { permisoEscritura } = require('../middleware/roles');

// Todas las rutas requieren autenticación
router.use(proteger);

// Crear registro de producción
router.post('/', permisoEscritura, async (req, res) => {
  try {
    // Verificar que el animal existe
    const animal = await Animal.findById(req.body.animal);
    if (!animal) {
      return res.status(404).json({ message: 'Animal no encontrado' });
    }

    // Agregar información del usuario que registra
    req.body.registradoPor = req.user._id;

    // Completar información del animal si no viene en el body
    if (!req.body.codigoVaca) req.body.codigoVaca = animal.codigo;
    if (!req.body.nombreVaca) req.body.nombreVaca = animal.nombre;

    const produccion = new Produccion(req.body);
    await produccion.save();

    // Actualizar último ordeño del animal
    animal.ultimoOrdeño = produccion.fecha;
    await animal.save();

    res.status(201).json(produccion);
  } catch (error) {
    res.status(400).json({ 
      message: 'Error al registrar la producción', 
      error: error.message 
    });
  }
});

// Obtener todos los registros de producción con filtros
router.get('/', async (req, res) => {
  try {
    const { finca, animal, fechaInicio, fechaFin, limit = 100 } = req.query;
    const filtros = {};

    if (finca) filtros.finca = finca;
    if (animal) filtros.animal = animal;
    
    if (fechaInicio || fechaFin) {
      filtros.fecha = {};
      if (fechaInicio) filtros.fecha.$gte = new Date(fechaInicio);
      if (fechaFin) filtros.fecha.$lte = new Date(fechaFin);
    }

    const producciones = await Produccion.find(filtros)
      .populate('animal', 'codigo nombre raza estado')
      .populate('registradoPor', 'nombre email')
      .populate('finca', 'nombreFinca propietario')
      .sort({ fecha: -1 })
      .limit(parseInt(limit));

    res.json(producciones);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al obtener producciones', 
      error: error.message 
    });
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
    res.status(500).json({ 
      message: 'Error al obtener la producción', 
      error: error.message 
    });
  }
});

// Obtener producción por periodo
router.get('/periodo/:inicio/:fin', async (req, res) => {
  try {
    const fechaInicio = new Date(req.params.inicio);
    const fechaFin = new Date(req.params.fin);
    const { finca } = req.query;

    const resultado = await Produccion.getProduccionPorPeriodo(
      fechaInicio, 
      fechaFin, 
      finca
    );

    res.json(resultado[0] || { 
      totalLitros: 0, 
      promedioLitros: 0, 
      registros: 0 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al obtener producción por periodo', 
      error: error.message 
    });
  }
});

// Obtener producción por animal
router.get('/analisis/por-animal', async (req, res) => {
  try {
    const { fechaInicio, fechaFin, finca } = req.query;
    
    const inicio = fechaInicio ? new Date(fechaInicio) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const fin = fechaFin ? new Date(fechaFin) : new Date();

    const resultado = await Produccion.getProduccionPorAnimal(inicio, fin, finca);

    res.json(resultado);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al obtener análisis por animal', 
      error: error.message 
    });
  }
});

// Obtener estadísticas diarias
router.get('/estadisticas/diarias', async (req, res) => {
  try {
    const { fecha, finca } = req.query;
    const fechaBusqueda = fecha ? new Date(fecha) : new Date();
    
    // Inicio y fin del día
    const inicioDia = new Date(fechaBusqueda.setHours(0, 0, 0, 0));
    const finDia = new Date(fechaBusqueda.setHours(23, 59, 59, 999));

    const filtro = {
      fecha: { $gte: inicioDia, $lte: finDia }
    };

    if (finca) filtro.finca = finca;

    const producciones = await Produccion.find(filtro);

    const totalLitros = producciones.reduce((sum, p) => sum + p.litrosTotal, 0);
    const vacasOrdenadas = new Set(producciones.map(p => p.animal.toString())).size;
    const promedioVaca = vacasOrdenadas > 0 ? totalLitros / vacasOrdenadas : 0;

    res.json({
      fecha: fechaBusqueda,
      totalLitros,
      vacasOrdenadas,
      promedioVaca: Number(promedioVaca.toFixed(2)),
      registros: producciones.length
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al obtener estadísticas', 
      error: error.message 
    });
  }
});

// Actualizar registro
router.put('/:id', permisoEscritura, async (req, res) => {
  try {
    const produccion = await Produccion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!produccion) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }
    res.json(produccion);
  } catch (error) {
    res.status(400).json({ 
      message: 'Error al actualizar la producción', 
      error: error.message 
    });
  }
});

// Eliminar registro
router.delete('/:id', permisoEscritura, async (req, res) => {
  try {
    const produccion = await Produccion.findByIdAndDelete(req.params.id);
    if (!produccion) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }
    res.json({ message: 'Producción eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al eliminar la producción', 
      error: error.message 
    });
  }
});

module.exports = router;