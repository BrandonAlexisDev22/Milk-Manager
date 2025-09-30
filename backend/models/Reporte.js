const mongoose = require('mongoose');

const reporteSchema = new mongoose.Schema({
  tipo: {
    type: String,
    enum: ['produccion', 'salud', 'economico', 'personalizado'],
    required: true
  },
  nombre: { type: String, required: true, trim: true },
  periodo: {
    fechaInicio: { type: Date, required: true },
    fechaFin: { type: Date, required: true }
  },
  datos: mongoose.Schema.Types.Mixed,
  generadoPor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  finca: { type: mongoose.Schema.Types.ObjectId, ref: 'Configuracion', required: true }
}, { timestamps: true });

const Reporte = mongoose.model('Reporte', reporteSchema);
