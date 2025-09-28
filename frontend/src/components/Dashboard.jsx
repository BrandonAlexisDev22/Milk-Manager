import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const [dashboardData] = useState({
    totalAnimales: 124,
    produccionHoy: 1250,
    produccionMes: 35400,
    promedioLitros: 18.5,
    animalesSanos: 120,
    animalesEnfermos: 4
  });

  // Datos simulados para gráficas
  const produccionSemanal = [
    { dia: 'Lun', litros: 1200, vacas: 65 },
    { dia: 'Mar', litros: 1150, vacas: 63 },
    { dia: 'Mie', litros: 1300, vacas: 67 },
    { dia: 'Jue', litros: 1250, vacas: 66 },
    { dia: 'Vie', litros: 1180, vacas: 64 },
    { dia: 'Sab', litros: 1100, vacas: 62 },
    { dia: 'Dom', litros: 1050, vacas: 60 }
  ];

  const distribucionRazas = [
    { name: 'Holstein', value: 45, color: '#22c55e' },
    { name: 'Jersey', value: 25, color: '#3b82f6' },
    { name: 'Angus', value: 20, color: '#f59e0b' },
    { name: 'Brahman', value: 10, color: '#ef4444' }
  ];

  const produccionMensual = [
    { mes: 'Ene', litros: 32000 },
    { mes: 'Feb', litros: 30500 },
    { mes: 'Mar', litros: 35000 },
    { mes: 'Abr', litros: 38000 },
    { mes: 'May', litros: 36500 },
    { mes: 'Jun', litros: 35400 }
  ];

  const MetricCard = ({ title, value, subtitle, icon, color = "green" }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-3xl font-bold text-${color}-600 mt-1`}>
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`text-4xl text-${color}-600`}>
          {icon}
        </div>
      </div>
    </div>
  );

  const AlertCard = ({ type, message }) => (
    <div className={`p-4 rounded-lg border-l-4 ${
      type === 'warning' 
        ? 'bg-yellow-50 border-yellow-400 text-yellow-800' 
        : 'bg-red-50 border-red-400 text-red-800'
    }`}>
      <div className="flex items-center">
        <span className="mr-2">
          {type === 'warning' ? '⚠️' : '🚨'}
        </span>
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header con resumen */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Dashboard - Milk Manager</h1>
        <p className="text-green-100">
          Resumen general de tu operación ganadera - {new Date().toLocaleDateString('es-ES')}
        </p>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Animales"
          value={dashboardData.totalAnimales}
          subtitle="4 nuevos este mes"
          icon="🐄"
          color="blue"
        />
        <MetricCard
          title="Producción Hoy"
          value={`${dashboardData.produccionHoy}L`}
          subtitle="+5% vs ayer"
          icon="🥛"
          color="green"
        />
        <MetricCard
          title="Producción Mensual"
          value={`${(dashboardData.produccionMes / 1000).toFixed(1)}K L`}
          subtitle="Meta: 40K L"
          icon="📊"
          color="purple"
        />
        <MetricCard
          title="Promedio por Vaca"
          value={`${dashboardData.promedioLitros}L`}
          subtitle="Diario"
          icon="📈"
          color="orange"
        />
      </div>

      {/* Alertas y notificaciones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Alertas Recientes</h3>
          <AlertCard 
            type="warning" 
            message="Vaca #127 requiere revisión veterinaria"
          />
          <AlertCard 
            type="error" 
            message="Producción de leche 15% por debajo del promedio en sector B"
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Estado de Salud</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Animales Sanos</span>
              <span className="font-semibold text-green-600">{dashboardData.animalesSanos}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Requieren Atención</span>
              <span className="font-semibold text-red-600">{dashboardData.animalesEnfermos}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ width: `${(dashboardData.animalesSanos / dashboardData.totalAnimales) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Producción Semanal */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Producción Semanal</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={produccionSemanal}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dia" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="litros" 
                stroke="#22c55e" 
                strokeWidth={3}
                name="Litros"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Distribución por Razas */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribución por Razas</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={distribucionRazas}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {distribucionRazas.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Producción Mensual */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Producción Mensual</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={produccionMensual}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="litros" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Vacas Productoras */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Vacas Productoras</h3>
          <div className="space-y-3">
            {[
              { id: 'V-001', nombre: 'Bella', litros: 28.5, raza: 'Holstein' },
              { id: 'V-045', nombre: 'Luna', litros: 26.8, raza: 'Jersey' },
              { id: 'V-023', nombre: 'Rosa', litros: 25.2, raza: 'Holstein' },
              { id: 'V-067', nombre: 'Mía', litros: 24.1, raza: 'Jersey' }
            ].map((vaca, index) => (
              <div key={vaca.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full text-sm font-bold">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-gray-800">{vaca.nombre}</p>
                    <p className="text-sm text-gray-500">{vaca.id} - {vaca.raza}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">{vaca.litros}L</p>
                  <p className="text-sm text-gray-500">diario</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <span className="text-2xl mb-2">➕</span>
            <span className="text-sm font-medium text-green-700">Nuevo Animal</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <span className="text-2xl mb-2">📝</span>
            <span className="text-sm font-medium text-blue-700">Registrar Ordeño</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <span className="text-2xl mb-2">📊</span>
            <span className="text-sm font-medium text-purple-700">Ver Reportes</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
            <span className="text-2xl mb-2">⚙️</span>
            <span className="text-sm font-medium text-orange-700">Configuración</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;