/* global process */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/Usuario');
const { Configuracion } = require('../models/Configuracion');
const { Animal } = require('../models/Animal');
const { Produccion } = require('../models/Registro_de_produccion');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB conectado');
  } catch (error) {
    console.error('❌ Error de conexión:', error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    // Limpiar datos existentes
    console.log('🗑️  Limpiando base de datos...');
    await User.deleteMany({});
    await Configuracion.deleteMany({});
    await Animal.deleteMany({});
    await Produccion.deleteMany({});

    // Crear usuario administrador
    console.log('👤 Creando usuarios...');
    const adminUser = await User.create({
      nombre: 'Administrador',
      email: 'admin@milkmanager.com',
      password: 'admin123',
      rol: 'Administrador'
    });

    const operadorUser = await User.create({
      nombre: 'Juan Pérez',
      email: 'operador@milkmanager.com',
      password: 'operador123',
      rol: 'Operador'
    });

    console.log('✅ Usuarios creados');

    // Crear configuración de finca
    console.log('🏡 Creando configuración de finca...');
    const finca = await Configuracion.create({
      nombreFinca: 'Hacienda La Esperanza',
      propietario: 'Carlos Rodríguez',
      direccion: 'Vereda El Roble, Km 5',
      telefono: '+57 300 1234567',
      email: 'contacto@haciendalaesperanza.com',
      moneda: 'COP',
      precioLitroLeche: 1200,
      metaProduccionDiaria: 1500,
      metaProduccionMensual: 45000,
      notificaciones: {
        email: true,
        alertasProduccion: true,
        alertasSalud: true,
        recordatoriosVacunacion: true
      },
      horarios: {
        ordenoManana: '05:00',
        ordenoTarde: '16:00'
      }
    });

    console.log('✅ Configuración creada');

    // Crear animales de ejemplo
    console.log('🐄 Creando animales...');
    const animales = await Animal.insertMany([
      {
        codigo: 'V-001',
        nombre: 'Bella',
        raza: 'Holstein',
        edad: 4,
        peso: 580,
        fechaNacimiento: new Date('2020-03-15'),
        estado: 'Sana',
        produccionPromedio: 28.5,
        observaciones: 'Excelente productora',
        finca: finca._id
      },
      {
        codigo: 'V-045',
        nombre: 'Luna',
        raza: 'Jersey',
        edad: 3,
        peso: 420,
        fechaNacimiento: new Date('2021-07-22'),
        estado: 'Sana',
        produccionPromedio: 26.8,
        observaciones: 'Muy dócil',
        finca: finca._id
      },
      {
        codigo: 'V-023',
        nombre: 'Rosa',
        raza: 'Holstein',
        edad: 5,
        peso: 620,
        fechaNacimiento: new Date('2019-05-10'),
        estado: 'Sana',
        produccionPromedio: 25.2,
        finca: finca._id
      },
      {
        codigo: 'V-067',
        nombre: 'Mía',
        raza: 'Jersey',
        edad: 2,
        peso: 380,
        fechaNacimiento: new Date('2022-02-14'),
        estado: 'Sana',
        produccionPromedio: 24.1,
        finca: finca._id
      },
      {
        codigo: 'V-089',
        nombre: 'Estrella',
        raza: 'Angus',
        edad: 6,
        peso: 680,
        fechaNacimiento: new Date('2018-11-20'),
        estado: 'Sana',
        produccionPromedio: 23.0,
        finca: finca._id
      },
      {
        codigo: 'V-127',
        nombre: 'Esperanza',
        raza: 'Angus',
        edad: 5,
        peso: 640,
        fechaNacimiento: new Date('2019-11-08'),
        estado: 'Requiere Atención',
        produccionPromedio: 15.2,
        observaciones: 'Revisión veterinaria pendiente',
        finca: finca._id
      }
    ]);

    console.log('✅ Animales creados:', animales.length);

    // Crear registros de producción de los últimos 7 días
    console.log('📊 Creando registros de producción...');
    const producciones = [];
    const hoy = new Date();

    for (let i = 0; i < 7; i++) {
      const fecha = new Date(hoy);
      fecha.setDate(fecha.getDate() - i);

      for (const animal of animales) {
        const litrosManana = Math.random() * 5 + (animal.produccionPromedio * 0.45);
        const litrosTarde = Math.random() * 5 + (animal.produccionPromedio * 0.45);

        producciones.push({
          fecha,
          animal: animal._id,
          codigoVaca: animal.codigo,
          nombreVaca: animal.nombre,
          litrosManana: Number(litrosManana.toFixed(1)),
          litrosTarde: Number(litrosTarde.toFixed(1)),
          litrosTotal: Number((litrosManana + litrosTarde).toFixed(1)),
          calidad: 'Buena',
          registradoPor: operadorUser._id,
          finca: finca._id
        });
      }
    }

    await Produccion.insertMany(producciones);
    console.log('✅ Registros de producción creados:', producciones.length);

    console.log('\n🎉 ¡Base de datos inicializada correctamente!\n');
    console.log('📝 Credenciales de acceso:');
    console.log('👨‍💼 Admin:');
    console.log('   Email: admin@milkmanager.com');
    console.log('   Password: admin123');
    console.log('\n👷 Operador:');
    console.log('   Email: operador@milkmanager.com');
    console.log('   Password: operador123');
    console.log('\n');

  } catch (error) {
    console.error('❌ Error al inicializar datos:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Conexión cerrada');
    process.exit(0);
  }
};

connectDB().then(() => {
  seedDatabase();
});