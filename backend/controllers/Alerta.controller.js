const { Alerta } = require('../models/Alerta.js');

exports.createAlerta = async (req, res) => {
  try {
    const alerta = new Alerta(req.body);
    await alerta.save();
    res.status(201).json(alerta);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAlertas = async (req, res) => {
  try {
    const alertas = await Alerta.find().populate('animal');
    res.json(alertas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAlertaById = async (req, res) => {
  try {
    const alerta = await Alerta.findById(req.params.id).populate('animal');
    if (!alerta) return res.status(404).json({ message: 'Alerta no encontrada' });
    res.json(alerta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAlerta = async (req, res) => {
  try {
    const alerta = await Alerta.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!alerta) return res.status(404).json({ message: 'Alerta no encontrada' });
    res.json(alerta);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteAlerta = async (req, res) => {
  try {
    const alerta = await Alerta.findByIdAndDelete(req.params.id);
    if (!alerta) return res.status(404).json({ message: 'Alerta no encontrada' });
    res.json({ message: 'Alerta eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
