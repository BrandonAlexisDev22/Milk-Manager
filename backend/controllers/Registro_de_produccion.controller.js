const { Produccion } = require('../models/Registro_de_produccion');

exports.createProduccion = async (req, res) => {
  try {
    const produccion = new Produccion(req.body);
    await produccion.save();
    res.status(201).json(produccion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProducciones = async (req, res) => {
  try {
    const producciones = await Produccion.find().populate('animal').populate('registradoPor');
    res.json(producciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProduccionById = async (req, res) => {
  try {
    const produccion = await Produccion.findById(req.params.id).populate('animal').populate('registradoPor');
    if (!produccion) return res.status(404).json({ message: 'Producción no encontrada' });
    res.json(produccion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduccion = async (req, res) => {
  try {
    const produccion = await Produccion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!produccion) return res.status(404).json({ message: 'Producción no encontrada' });
    res.json(produccion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProduccion = async (req, res) => {
  try {
    const produccion = await Produccion.findByIdAndDelete(req.params.id);
    if (!produccion) return res.status(404).json({ message: 'Producción no encontrada' });
    res.json({ message: 'Producción eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
