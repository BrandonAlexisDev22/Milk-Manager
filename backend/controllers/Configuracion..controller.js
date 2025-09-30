const { Configuracion } = require('../models');

exports.createConfig = async (req, res) => {
  try {
    const config = new Configuracion(req.body);
    await config.save();
    res.status(201).json(config);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getConfigs = async (req, res) => {
  try {
    const configs = await Configuracion.find();
    res.json(configs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getConfigById = async (req, res) => {
  try {
    const config = await Configuracion.findById(req.params.id);
    if (!config) return res.status(404).json({ message: 'Configuración no encontrada' });
    res.json(config);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateConfig = async (req, res) => {
  try {
    const config = await Configuracion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!config) return res.status(404).json({ message: 'Configuración no encontrada' });
    res.json(config);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteConfig = async (req, res) => {
  try {
    const config = await Configuracion.findByIdAndDelete(req.params.id);
    if (!config) return res.status(404).json({ message: 'Configuración no encontrada' });
    res.json({ message: 'Configuración eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
