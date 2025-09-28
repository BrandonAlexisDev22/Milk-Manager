import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProduccionPage = () => {
  const [registros, setRegistros] = useState([
    {
      id: 1,
      fecha: '2024-01-15',
      codigoVaca: 'V-001',
      nombreVaca: 'Bella',
      litrosManana: 14.5,
      litrosTarde: 12.8,
      litrosTotal: 27.3,
      observaciones: 'Producción normal'
    },
    {
      id: 2,
      fecha: '2024-01-15',
      codigoVaca: 'V-045',
      nombreVaca: 'Luna',
      litrosManana: 13.2,
      litrosTarde: 11.5,
      litrosTotal: 24.7,
      observaciones: ''
    },
    {
      id: 3,
      fecha: '2024-01-14',
      codigoVaca: 'V-001',
      nombreVaca: 'Bella',
      litrosManana: 15.1,
      litrosTarde: 13.2,
      litrosTotal: 28.3,
      observaciones: 'Excelente día'
    }
  ]);

  const [filtroFecha, setFiltroFecha] = useState('');
  const [filtroVaca, setFiltroVaca] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [registroEditando, setRegistroEditando] = useState(null);

  const [nuevoRegistro, setNuevoRegistro] = useState({
    fecha: new Date().toISOString().split('T')[0],
    codigoVaca: '',
    nombreVaca: '',
    litrosManana: '',
    litrosTarde: '',
    observaciones: ''
  });

  // Datos simulados para vacas disponibles
  const vacasDisponibles = [
    { codigo: 'V-001', nombre: 'Bella' },
    { codigo: 'V-045', nombre: 'Luna' },
    { codigo: 'V-023', nombre: 'Rosa' },
    { codigo: 'V-067', nombre: 'Mía' },
    { codigo: 'V-089', nombre: 'Estrella' },
    { codigo: 'V-127', nombre: 'Esperanza' }
  ];

  // Datos para gráficas
  const produccionDiaria = [
    { fecha: '10/01', total: 1450, vacas: 65 },
    { fecha: '11/01', total: 1520, vacas: 67 },
    { fecha: '12/01', total: 1380, vacas: 64 },
    { fecha: '13/01', total: 1600, vacas: 68 },
    { fecha: '14/01', total: 1480, vacas: 66 },
    { fecha: '15/01', total: 1550, vacas: 67 }
  ];

  const produccionPorVaca = registros
    .reduce((acc, registro) => {
      const existing = acc.find(item => item.vaca === registro.nombreVaca);
      if (existing) {
        existing.total += registro.litrosTotal;
        existing.registros += 1;
      } else {
        acc.push({
          vaca: registro.nombreVaca,
          total: registro.litrosTotal,
          registros: 1
        });
      }
      return acc;
    }, [])
    .map(item => ({
      ...item,
      promedio: (item.total / item.registros).toFixed(1)
    }))
    .sort((a, b) => b.total - a.total);

  const registrosFiltrados = registros.filter(registro => {
    const coincideFecha = filtroFecha === '' || registro.fecha === filtroFecha;
    const coincideVaca = filtroVaca === '' || 
                        registro.codigoVaca.includes(filtroVaca) || 
                        registro.nombreVaca.toLowerCase().includes(filtroVaca.toLowerCase());
    
    return coincideFecha && coincideVaca;
  });

  const abrirModal = (registro = null) => {
    if (registro) {
      setRegistroEditando(registro);
      setNuevoRegistro({
        fecha: registro.fecha,
        codigoVaca: registro.codigoVaca,
        nombreVaca: registro.nombreVaca,
        litrosManana: registro.litrosManana,
        litrosTarde: registro.litrosTarde,
        observaciones: registro.observaciones
      });
    } else {
      setRegistroEditando(null);
      setNuevoRegistro({
        fecha: new Date().toISOString().split('T')[0],
        codigoVaca: '',
        nombreVaca: '',
        litrosManana: '',
        litrosTarde: '',
        observaciones: ''
      });
    }
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setRegistroEditando(null);
  };

  const seleccionarVaca = (vaca) => {
    setNuevoRegistro({
      ...nuevoRegistro,
      codigoVaca: vaca.codigo,
      nombreVaca: vaca.nombre
    });
  };

  const calcularTotal = () => {
    const manana = parseFloat(nuevoRegistro.litrosManana) || 0;
    const tarde = parseFloat(nuevoRegistro.litrosTarde) || 0;
    return manana + tarde;
  };

  const guardarRegistro = () => {
    const litrosTotal = calcularTotal();
    
    if (registroEditando) {
      // Editar registro existente
      setRegistros(registros.map(registro => 
        registro.id === registroEditando.id 
          ? { ...nuevoRegistro, id: registroEditando.id, litrosTotal }
          : registro
      ));
    } else {
      // Crear nuevo registro
      const id = Math.max(...registros.map(r => r.id)) + 1;
      setRegistros([...registros, {
        ...nuevoRegistro,
        id,
        litrosTotal
      }]);
    }
    cerrarModal();
  };

  const eliminarRegistro = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este registro?')) {
      setRegistros(registros.filter(registro => registro.id !== id));
    }
  };

  const resumenDiario = {
    totalLitros: registrosFiltrados.reduce((sum, r) => sum + r.litrosTotal, 0),
    vacasOrdenadas: new Set(registrosFiltrados.map(r => r.codigoVaca)).size,
    promedioVaca: registrosFiltrados.length > 0 
      ? (registrosFiltrados.reduce((sum, r) => sum + r.litrosTotal, 0) / new Set(registrosFiltrados.map(r => r.codigoVaca)).size).toFixed(1)
      : 0
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Control de Producción</h1>
          <p className="text-gray-600">Registro diario de ordeño</p>
        </div>
        <button
          onClick={() => abrirModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <span>📝</span>
          <span>Nuevo Registro</span>
        </button>
      </div>

      {/* Resumen del día */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Producción Hoy</p>
              <p className="text-3xl font-bold text-blue-600">{resumenDiario.totalLitros.toFixed(1)}L</p>
            </div>
            <div className="text-4xl text-blue-600">🥛</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Vacas Ordeñadas</p>
              <p className="text-3xl font-bold text-green-600">{resumenDiario.vacasOrdenadas}</p>
            </div>
            <div className="text-4xl text-green-600">🐄</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Promedio por Vaca</p>
              <p className="text-3xl font-bold text-purple-600">{resumenDiario.promedioVaca}L</p>
            </div>
            <div className="text-4xl text-purple-600">📊</div>
          </div>
        </div>
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Producción Diaria (Últimos 6 días)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={produccionDiaria}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="total" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="Litros"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Producción por Vaca</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={produccionPorVaca.slice(0, 5)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="vaca" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha
            </label>
            <input
              type="date"
              value={filtroFecha}
              onChange={(e) => setFiltroFecha(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Buscar Vaca
            </label>
            <input
              type="text"
              value={filtroVaca}
              onChange={(e) => setFiltroVaca(e.target.value)}
              placeholder="Código o nombre..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setFiltroFecha('');
                setFiltroVaca('');
              }}
              className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Limpiar Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Tabla de registros */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vaca
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mañana
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tarde
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Observaciones
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {registrosFiltrados.map((registro) => (
                <tr key={registro.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(registro.fecha).toLocaleDateString('es-ES')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {registro.nombreVaca}
                      </div>
                      <div className="text-sm text-gray-500">{registro.codigoVaca}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {registro.litrosManana}L
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {registro.litrosTarde}L
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-blue-600">
                      {registro.litrosTotal}L
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {registro.observaciones || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => abrirModal(registro)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarRegistro(registro.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para agregar/editar registro */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">
              {registroEditando ? 'Editar Registro' : 'Nuevo Registro de Ordeño'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha
                </label>
                <input
                  type="date"
                  value={nuevoRegistro.fecha}
                  onChange={(e) => setNuevoRegistro({...nuevoRegistro, fecha: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Seleccionar Vaca
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
                  {vacasDisponibles.map((vaca) => (
                    <button
                      key={vaca.codigo}
                      type="button"
                      onClick={() => seleccionarVaca(vaca)}
                      className={`p-2 text-left rounded transition-colors ${
                        nuevoRegistro.codigoVaca === vaca.codigo
                          ? 'bg-blue-100 border-blue-500 border'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="text-sm font-medium">{vaca.nombre}</div>
                      <div className="text-xs text-gray-500">{vaca.codigo}</div>
                    </button>
                  ))}
                </div>
                {nuevoRegistro.codigoVaca && (
                  <div className="mt-2 text-sm text-blue-600">
                    Seleccionado: {nuevoRegistro.nombreVaca} ({nuevoRegistro.codigoVaca})
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Litros Mañana
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={nuevoRegistro.litrosManana}
                    onChange={(e) => setNuevoRegistro({...nuevoRegistro, litrosManana: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Litros Tarde
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={nuevoRegistro.litrosTarde}
                    onChange={(e) => setNuevoRegistro({...nuevoRegistro, litrosTarde: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.0"
                  />
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-md">
                <span className="text-sm font-medium text-blue-800">
                  Total: {calcularTotal().toFixed(1)} litros
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Observaciones
                </label>
                <textarea
                  value={nuevoRegistro.observaciones}
                  onChange={(e) => setNuevoRegistro({...nuevoRegistro, observaciones: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Observaciones adicionales..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={cerrarModal}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={guardarRegistro}
                disabled={!nuevoRegistro.codigoVaca || !nuevoRegistro.litrosManana || !nuevoRegistro.litrosTarde}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
              >
                {registroEditando ? 'Actualizar' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProduccionPage;