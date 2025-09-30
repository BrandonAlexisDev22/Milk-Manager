const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: [true, 'El código es requerido'],
    unique: true,
    uppercase: true,
    trim: true
  },
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  raza: {
    type: String,
    required: [true, 'La raza es requerida'],
    enum: ['Holstein', 'Jersey', 'Angus', 'Brahman', 'Simmental', 'Otra']
  },
  edad: {
    type: Number,
    required: [true, 'La edad es requerida'],
    min: 0
  },
  peso: {
    type: Number,
    required: [true, 'El peso es requerido'],
    min: 0
  },
  fechaNacimiento: {
    type: Date,
    required: [true, 'La fecha de nacimiento es requerida']
  },
  estado: {
    type: String,
    enum: ['Sana', 'Requiere Atención', 'En Tratamiento'],
    default: 'Sana'
  },
  produccionPromedio: {
    type: Number,
    default: 0,
    min: 0
  },
  ultimoOrdeño: Date,
  observaciones: {
    type: String,
    trim: true
  },
  historialMedico: [{
    fecha: Date,
    diagnostico: String,
    tratamiento: String,
    veterinario: String
  }],
  vacunaciones: [{
    fecha: Date,
    tipoVacuna: String,
    proximaDosis: Date
  }],
  activo: {
    type: Boolean,
    default: true
  },
  finca: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Configuracion',
    required: true
  }
}, { timestamps: true });

const Animal = mongoose.model('Animal', animalSchema);
