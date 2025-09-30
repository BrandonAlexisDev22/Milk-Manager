const mongoose = require('mongoose');

const produccionSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    required: [true, 'La fecha es requerida'],
    default: Date.now
  },
  animal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Animal',
    required: [true, 'El animal es requerido']
  },
  codigoVaca: { type: String, required: true },
  nombreVaca: { type: String, required: true },
  litrosManana: { type: Number, required: true, min: 0, max: 100 },
  litrosTarde: { type: Number, required: true, min: 0, max: 100 },
  litrosTotal: { type: Number, required: true },
  observaciones: { type: String, trim: true },
  calidad: {
    type: String,
    enum: ['Excelente', 'Buena', 'Regular', 'Mala'],
    default: 'Buena'
  },
  registradoPor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  finca: { type: mongoose.Schema.Types.ObjectId, ref: 'Configuracion', required: true }
}, { timestamps: true });

// Calcular litrosTotal antes de guardar
produccionSchema.pre('save', function (next) {
  this.litrosTotal = this.litrosManana + this.litrosTarde;
  next();
});

// Índices compuestos
produccionSchema.index({ fecha: -1, animal: 1 });
produccionSchema.index({ fecha: -1 });
produccionSchema.index({ animal: 1, fecha: -1 });

// Método estático
produccionSchema.statics.getProduccionPorPeriodo = function (fechaInicio, fechaFin) {
  return this.aggregate([
    { $match: { fecha: { $gte: fechaInicio, $lte: fechaFin } } },
    {
      $group: {
        _id: null,
        totalLitros: { $sum: '$litrosTotal' },
        promedioLitros: { $avg: '$litrosTotal' },
        registros: { $sum: 1 }
      }
    }
  ]);
};

const Produccion = mongoose.model('Produccion', produccionSchema);