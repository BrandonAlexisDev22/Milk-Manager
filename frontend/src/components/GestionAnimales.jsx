import { useState } from 'react';

const AnimalesPage = () => {
  const [animales, setAnimales] = useState([
    {
      id: 1,
      codigo: 'V-001',
      nombre: 'Bella',
      raza: 'Holstein',
      edad: 4,
      peso: 580,
      estado: 'Sana',
      fechaNacimiento: '2020-03-15',
      produccionPromedio: 28.5,
      ultimoOrdeño: '2024-01-15',
      observaciones: 'Excelente productora'
    },
    {
      id: 2,
      codigo: 'V-045',
      nombre: 'Luna',
      raza: 'Jersey',
      edad: 3,
      peso: 420,
      estado: 'Sana',
      fechaNacimiento: '2021-07-22',
      produccionPromedio: 26.8,
      ultimoOrdeño: '2024-01-15',
      observaciones: 'Muy dócil'
    },
    {
      id: 3,
      codigo: 'V-127',
      nombre: 'Esperanza',
      raza: 'Angus',
      edad: 5,
      peso: 640,
      estado: 'Requiere Atención',
      fechaNacimiento: '2019-11-08',
      produccionPromedio: 15.2,
      ultimoOrdeño: '2024-01-14',
      observaciones: 'Revisión veterinaria pendiente'
    }
  ]);

  const [filtro, setFiltro] = useState('');
  const [razaFiltro, setRazaFiltro] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [animalEditando, setAnimalEditando] = useState(null);
  const [vistaDetalle, setVistaDetalle] = useState(null);

  const [nuevoAnimal, setNuevoAnimal] = useState({
    codigo: '',
    nombre: '',
    raza: '',
    edad: '',
    peso: '',
    fechaNacimiento: '',
    observaciones: ''
  });

  const razasDisponibles = ['Holstein', 'Jersey', 'Angus', 'Brahman', 'Simmental'];
  const estadosDisponibles = ['Sana', 'Requiere Atención', 'En Tratamiento'];

  const animalesFiltrados = animales.filter(animal => {
    const coincideNombre = animal.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
                          animal.codigo.toLowerCase().includes(filtro.toLowerCase());
    const coincideRaza = razaFiltro === '' || animal.raza === razaFiltro;
    const coincideEstado = estadoFiltro === '' || animal.estado === estadoFiltro;
    
    return coincideNombre && coincideRaza && coincideEstado;
  });

  const abrirModal = (animal = null) => {
    if (animal) {
      setAnimalEditando(animal);
      setNuevoAnimal(animal);
    } else {
      setAnimalEditando(null);
      setNuevoAnimal({
        codigo: '',
        nombre: '',
        raza: '',
        edad: '',
        peso: '',
        fechaNacimiento: '',
        observaciones: ''
      });
    }
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setAnimalEditando(null);
  };

  const guardarAnimal = () => {
    if (animalEditando) {
      // Editar animal existente
      setAnimales(animales.map(animal => 
        animal.id === animalEditando.id 
          ? { ...nuevoAnimal, id: animalEditando.id, estado: animalEditando.estado }
          : animal
      ));
    } else {
      // Crear nuevo animal
      const id = Math.max(...animales.map(a => a.id)) + 1;
      setAnimales([...animales, {
        ...nuevoAnimal,
        id,
        estado: 'Sana',
        produccionPromedio: 0,
        ultimoOrdeño: new Date().toISOString().split('T')[0]
      }]);
    }
    cerrarModal();
  };

  const eliminarAnimal = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este animal?')) {
      setAnimales(animales.filter(animal => animal.id !== id));
    }
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Sana': return 'bg-green-100 text-green-800';
      case 'Requiere Atención': return 'bg-yellow-100 text-yellow-800';
      case 'En Tratamiento': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestión de Animales</h1>
          <p className="text-gray-600">Administra tu ganado - Total: {animales.length} animales</p>
        </div>
        <button
          onClick={() => abrirModal()}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <span>➕</span>
          <span>Agregar Animal</span>
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Buscar
            </label>
            <input
              type="text"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              placeholder="Nombre o código..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Raza
            </label>
            <select
              value={razaFiltro}
              onChange={(e) => setRazaFiltro(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Todas las razas</option>
              {razasDisponibles.map(raza => (
                <option key={raza} value={raza}>{raza}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <select
              value={estadoFiltro}
              onChange={(e) => setEstadoFiltro(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Todos los estados</option>
              {estadosDisponibles.map(estado => (
                <option key={estado} value={estado}>{estado}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setFiltro('');
                setRazaFiltro('');
                setEstadoFiltro('');
              }}
              className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Limpiar Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Lista de Animales */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Animal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Raza
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Edad/Peso
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producción
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {animalesFiltrados.map((animal) => (
                <tr key={animal.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {animal.nombre}
                      </div>
                      <div className="text-sm text-gray-500">{animal.codigo}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {animal.raza}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>{animal.edad} años</div>
                    <div className="text-gray-500">{animal.peso} kg</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEstadoColor(animal.estado)}`}>
                      {animal.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>{animal.produccionPromedio}L/día</div>
                    <div className="text-gray-500 text-xs">Último: {animal.ultimoOrdeño}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => setVistaDetalle(animal)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Ver
                    </button>
                    <button
                      onClick={() => abrirModal(animal)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarAnimal(animal.id)}
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

      {/* Modal para agregar/editar animal */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {animalEditando ? 'Editar Animal' : 'Agregar Nuevo Animal'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Código
                </label>
                <input
                  type="text"
                  value={nuevoAnimal.codigo}
                  onChange={(e) => setNuevoAnimal({...nuevoAnimal, codigo: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="V-001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  value={nuevoAnimal.nombre}
                  onChange={(e) => setNuevoAnimal({...nuevoAnimal, nombre: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Nombre del animal"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Raza
                </label>
                <select
                  value={nuevoAnimal.raza}
                  onChange={(e) => setNuevoAnimal({...nuevoAnimal, raza: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Seleccionar raza</option>
                  {razasDisponibles.map(raza => (
                    <option key={raza} value={raza}>{raza}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Edad (años)
                  </label>
                  <input
                    type="number"
                    value={nuevoAnimal.edad}
                    onChange={(e) => setNuevoAnimal({...nuevoAnimal, edad: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Peso (kg)
                  </label>
                  <input
                    type="number"
                    value={nuevoAnimal.peso}
                    onChange={(e) => setNuevoAnimal({...nuevoAnimal, peso: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  value={nuevoAnimal.fechaNacimiento}
                  onChange={(e) => setNuevoAnimal({...nuevoAnimal, fechaNacimiento: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Observaciones
                </label>
                <textarea
                  value={nuevoAnimal.observaciones}
                  onChange={(e) => setNuevoAnimal({...nuevoAnimal, observaciones: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                onClick={guardarAnimal}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                {animalEditando ? 'Actualizar' : 'Agregar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de detalle */}
      {vistaDetalle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Detalle del Animal</h3>
              <button
                onClick={() => setVistaDetalle(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Código:</span>
                  <p className="text-gray-900">{vistaDetalle.codigo}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Nombre:</span>
                  <p className="text-gray-900">{vistaDetalle.nombre}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Raza:</span>
                  <p className="text-gray-900">{vistaDetalle.raza}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Edad:</span>
                  <p className="text-gray-900">{vistaDetalle.edad} años</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Peso:</span>
                  <p className="text-gray-900">{vistaDetalle.peso} kg</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Estado:</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEstadoColor(vistaDetalle.estado)}`}>
                    {vistaDetalle.estado}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Fecha de Nacimiento:</span>
                <p className="text-gray-900">{vistaDetalle.fechaNacimiento}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Producción Promedio:</span>
                <p className="text-gray-900">{vistaDetalle.produccionPromedio} L/día</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Último Ordeño:</span>
                <p className="text-gray-900">{vistaDetalle.ultimoOrdeño}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Observaciones:</span>
                <p className="text-gray-900">{vistaDetalle.observaciones || 'Ninguna'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimalesPage;