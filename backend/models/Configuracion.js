const mongoose = require('mongoose');


const configuracionSchema = new mongoose.Schema({
  nombreFinca: { type: String, required: true, trim: true },
  propietario: { type: String, required: true, trim: true },
  direccion: { type: String, trim: true },
  telefono: { type: String, trim: true },
  email: { type: String, lowercase: true, trim: true },
  moneda: { type: String, enum: ['COP', 'USD', 'EUR', 'MXN'], default: 'COP' },
  precioLitroLeche: { type: Number, required: true, default: 1200, min: 0 },
  metaProduccionDiaria: { type: Number, default: 1500, min: 0 },
  metaProduccionMensual: { type: Number, default: 45000, min: 0 },
  notificaciones: {
    email: { type: Boolean, default: true },
    alertasProduccion: { type: Boolean, default: true },
    alertasSalud: { type: Boolean, default: true },
    recordatoriosVacunacion: { type: Boolean, default: true }
  },
  horarios: {
    ordenoManana: { type: String, default: '05:00' },
    ordenoTarde: { type: String, default: '16:00' }
  },
  razasPersonalizadas: [{ type: String, trim: true }],
  ultimoBackup: Date,
  frecuenciaBackup: { type: String, enum: ['diario', 'semanal', 'mensual'], default: 'semanal' }
}, { timestamps: true });

const Configuracion = mongoose.model('Configuracion', configuracionSchema);
