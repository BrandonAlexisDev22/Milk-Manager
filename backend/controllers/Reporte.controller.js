const { Reporte } = require('../models/Reporte');

exports.createReporte = async (req, res) => {
  try {
    const reporte = new Reporte(req.body);
    await reporte.save();
    res.status(201).json(reporte);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getReportes = async (req, res) => {
  try {
    const reportes = await Reporte.find().populate('generadoPor');
    res.json(reportes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getReporteById = async (req, res) => {
  try {
    const reporte = await Reporte.findById(req.params.id).populate('generadoPor');
    if (!reporte) return res.status(404).json({ message: 'Reporte no encontrado' });
    res.json(reporte);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateReporte = async (req, res) => {
  try {
    const reporte = await Reporte.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reporte) return res.status(404).json({ message: 'Reporte no encontrado' });
    res.json(reporte);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteReporte = async (req, res) => {
  try {
    const reporte = await Reporte.findByIdAndDelete(req.params.id);
    if (!reporte) return res.status(404).json({ message: 'Reporte no encontrado' });
    res.json({ message: 'Reporte eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
