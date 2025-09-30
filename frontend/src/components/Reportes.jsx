import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const ReportesPage = () => {
  const [tipoReporte, setTipoReporte] = useState('produccion');
  const [periodoReporte, setPeriodoReporte] = useState('mensual');

  // Datos simulados para reportes
  const produccionMensual = [
    { mes: 'Enero', litros: 32000, vacas: 65, costos: 8500, ingresos: 16000 },
    { mes: 'Febrero', litros: 30500, vacas: 63, costos: 8200, ingresos: 15250 },
    { mes: 'Marzo', litros: 35000, vacas: 67, costos: 9000, ingresos: 17500 },
    { mes: 'Abril', litros: 38000, vacas: 68, costos: 9200, ingresos: 19000 },
    { mes: 'Mayo', litros: 36500, vacas: 66, costos: 8800, ingresos: 18250 },
    { mes: 'Junio', litros: 35400, vacas: 67, costos: 8900, ingresos: 17700 }
  ];

  const rendimientoPorRaza = [
    { raza: 'Holstein', animales: 45, promedioLitros: 24.5, totalLitros: 1102.5, color: '#22c55e' },
    { raza: 'Jersey', animales: 25, promedioLitros: 18.2, totalLitros: 455, color: '#3b82f6' },
    { raza: 'Angus', animales: 20, promedioLitros: 16.8, totalLitros: 336, color: '#f59e0b' },
    { raza: 'Brahman', animales: 10, promedioLitros: 14.5, totalLitros: 145, color: '#ef4444' }
  ];

  const saludAnimal = [
    { mes: 'Enero', sanos: 92, enfermos: 8, tratamientos: 5 },
    { mes: 'Febrero', sanos: 94, enfermos: 6, tratamientos: 3 },
    { mes: 'Marzo', sanos: 89, enfermos: 11, tratamientos: 8 },
    { mes: 'Abril', sanos: 95, enfermos: 5, tratamientos: 2 },
    { mes: 'Mayo', sanos: 91, enfermos: 9, tratamientos: 6 },
    { mes: 'Junio', sanos: 93, enfermos: 7, tratamientos: 4 }
  ];

  const costosBeneficios = [
    { mes: 'Enero', ingresos: 16000, costos: 8500, beneficio: 7500 },
    { mes: 'Febrero', ingresos: 15250, costos: 8200, beneficio: 7050 },
    { mes: 'Marzo', ingresos: 17500, costos: 9000, beneficio: 8500 },
    { mes: 'Abril', ingresos: 19000, costos: 9200, beneficio: 9800 },
    { mes: 'Mayo', ingresos: 18250, costos: 8800, beneficio: 9450 },
    { mes: 'Junio', ingresos: 17700, costos: 8900, beneficio: 8800 }
  ];

  const topVacas = [
    { nombre: 'Bella', codigo: 'V-001', litros: 847.5, dias: 30, promedio: 28.25 },
    { nombre: 'Luna', codigo: 'V-045', litros: 804.0, dias: 30, promedio: 26.80 },
    { nombre: 'Rosa', codigo: 'V-023', litros: 756.0, dias: 30, promedio: 25.20 },
    { nombre: 'Mía', codigo: 'V-067', litros: 723.0, dias: 30, promedio: 24.10 },
    { nombre: 'Estrella', codigo: 'V-089', litros: 690.0, dias: 30, promedio: 23.00 }
  ];

  const MetricCard = ({ title, value, subtitle, icon, color = "blue", trend }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-3xl font-bold text-${color}-600 mt-1`}>
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
              <span className="mr-1">{trend.positive ? '↗️' : '↘️'}</span>
              <span>{trend.value}</span>
            </div>
          )}
        </div>
        <div className={`text-4xl text-${color}-600`}>
          {icon}
        </div>
      </div>
    </div>
  );

  const exportarReporte = (tipo) => {
    alert(`Exportando reporte como ${tipo}... (Funcionalidad simulada)`);
  };

  const renderReporteProduccion = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="Producción Total"
          value="207.4K L"
          subtitle="Últimos 6 meses"
          icon="🥛"
          color="blue"
          trend={{ positive: true, value: "+8.5% vs período anterior" }}
        />
        <MetricCard
          title="Promedio Diario"
          value="1,152 L"
          subtitle="Junio 2024"
          icon="📊"
          color="green"
          trend={{ positive: true, value: "+3.2%" }}
        />
        <MetricCard
          title="Vacas Productivas"
          value="67"
          subtitle="En ordeño activo"
          icon="🐄"
          color="purple"
        />
        <MetricCard
          title="Rendimiento/Vaca"
          value="17.2 L"
          subtitle="Promedio diario"
          icon="📈"
          color="orange"
          trend={{ positive: false, value: "-1.1%" }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Evolución Mensual</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={produccionMensual}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="litros" 
                stroke="#3b82f6" 
                fill="#3b82f6" 
                fillOpacity={0.3}
                name="Litros"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Rendimiento por Raza</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={rendimientoPorRaza}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="raza" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="promedioLitros" fill="#10b981" name="Promedio L/día" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Top 5 Vacas Productoras</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Posición</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vaca</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Litros</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Promedio Diario</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Días Activos</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topVacas.map((vaca, index) => (
                <tr key={vaca.codigo} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-bold">
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{vaca.nombre}</div>
                      <div className="text-sm text-gray-500">{vaca.codigo}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">
                    {vaca.litros}L
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vaca.promedio}L
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vaca.dias} días
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderReporteSalud = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Animales Sanos"
          value="93%"
          subtitle="67 de 72 animales"
          icon="✅"
          color="green"
          trend={{ positive: true, value: "+2% vs mes anterior" }}
        />
        <MetricCard
          title="En Tratamiento"
          value="5"
          subtitle="Atención veterinaria"
          icon="🏥"
          color="orange"
        />
        <MetricCard
          title="Vacunaciones"
          value="24"
          subtitle="Este mes"
          icon="💉"
          color="blue"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Estado de Salud por Mes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={saludAnimal}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="sanos" 
                stackId="1"
                stroke="#22c55e" 
                fill="#22c55e" 
                name="Sanos"
              />
              <Area 
                type="monotone" 
                dataKey="enfermos" 
                stackId="1"
                stroke="#ef4444" 
                fill="#ef4444" 
                name="Enfermos"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribución de Salud</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Sanos', value: 93, color: '#22c55e' },
                  { name: 'Requieren Atención', value: 5, color: '#f59e0b' },
                  { name: 'En Tratamiento', value: 2, color: '#ef4444' }
                ]}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                <Cell fill="#22c55e" />
                <Cell fill="#f59e0b" />
                <Cell fill="#ef4444" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderReporteEconomico = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="Ingresos Totales"
          value="$103.7K"
          subtitle="Últimos 6 meses"
          icon="💰"
          color="green"
          trend={{ positive: true, value: "+12.3%" }}
        />
        <MetricCard
          title="Costos Totales"
          value="$52.6K"
          subtitle="Últimos 6 meses"
          icon="💸"
          color="red"
        />
        <MetricCard
          title="Beneficio Neto"
          value="$51.1K"
          subtitle="Margen: 49.3%"
          icon="📈"
          color="blue"
          trend={{ positive: true, value: "+15.7%" }}
        />
        <MetricCard
          title="Costo/Litro"
          value="$0.254"
          subtitle="Promedio"
          icon="🥛"
          color="orange"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Análisis Económico Mensual</h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={costosBeneficios}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="ingresos" 
              stackId="1"
              stroke="#22c55e" 
              fill="#22c55e" 
              fillOpacity={0.8}
              name="Ingresos"
            />
            <Area 
              type="monotone" 
              dataKey="costos" 
              stackId="2"
              stroke="#ef4444" 
              fill="#ef4444" 
              fillOpacity={0.8}
              name="Costos"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderReporteActual = () => {
    switch (tipoReporte) {
      case 'produccion':
        return renderReporteProduccion();
      case 'salud':
        return renderReporteSalud();
      case 'economico':
        return renderReporteEconomico();
      default:
        return renderReporteProduccion();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Reportes y Análisis</h1>
          <p className="text-gray-600">Métricas detalladas de tu operación ganadera</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => exportarReporte('excel')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <span>📊</span>
            <span>Excel</span>
          </button>
          <button
            onClick={() => exportarReporte('pdf')}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
          >
            <span>📄</span>
            <span>PDF</span>
          </button>
        </div>
      </div>

      {/* Filtros y controles */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Reporte
            </label>
            <select
              value={tipoReporte}
              onChange={(e) => setTipoReporte(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="produccion">Producción</option>
              <option value="salud">Salud Animal</option>
              <option value="economico">Análisis Económico</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Período
            </label>
            <select
              value={periodoReporte}
              onChange={(e) => setPeriodoReporte(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="semanal">Semanal</option>
              <option value="mensual">Mensual</option>
              <option value="trimestral">Trimestral</option>
              <option value="anual">Anual</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Actualizar Reporte
            </button>
          </div>
        </div>
      </div>

      {/* Contenido del reporte */}
      {renderReporteActual()}
    </div>
  );
};

export default ReportesPage;