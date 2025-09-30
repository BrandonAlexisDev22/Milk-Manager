/* global process */
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/usuarios', require('./routes/Usuario.routes'));
app.use('/api/animales', require('./routes/Animal.routes'));
app.use('/api/produccion', require('./routes/Registros_de_produccion.routes'));
app.use('/api/alertas', require('./routes/Alerta.routes'));
app.use('/api/reportes', require('./routes/Reportes.routes'));
app.use('/api/configuracion', require('./routes/Configuracion.routes'));

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({ message: 'API Milk Manager - Sistema de Gestión Ganadera' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Error interno del servidor', 
    error: process.env.NODE_ENV === 'development' ? err.message : {} 
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});