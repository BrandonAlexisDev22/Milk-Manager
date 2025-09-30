const mongoose = require('mongoose');

const alertaSchema = new mongoose.Schema({
  tipo: { type: String, enum: ['salud', 'produccion', 'vacunacion', 'general'], required: true },
  prioridad: { type: String, enum: ['baja', 'media', 'alta', 'critica'], default: 'media' },
  titulo: { type: String, required: true, trim: true },
  mensaje: { type: String, required: true },
  animal: { type: mongoose.Schema.Types.ObjectId, ref: 'Animal' },
  leida: { type: Boolean, default: false },
  fechaAlerta: { type: Date, default: Date.now },
  finca: { type: mongoose.Schema.Types.ObjectId, ref: 'Configuracion', required: true }
}, { timestamps: true });

const Alerta = mongoose.model('Alerta', alertaSchema);
