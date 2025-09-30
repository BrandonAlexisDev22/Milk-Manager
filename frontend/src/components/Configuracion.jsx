import { useState } from 'react';

const ConfiguracionPage = () => {
  const [configuracion, setConfiguracion] = useState({
    // Configuración de la finca
    nombreFinca: 'Finca Los Alpes',
    propietario: 'Juan Pérez',
    direccion: 'Vereda El Progreso, Km 15',
    telefono: '+57 300 123 4567',
    email: 'juan.perez@gmail.com',
    
    // Configuración del sistema
    moneda: 'COP',
    precioLitroLeche: 1200,
    metaProduccionDiaria: 1500,
    metaProduccionMensual: 45000,
    
    // Notificaciones
    notificacionesEmail: true,
    alertasProduccion: true,
    alertasSalud: true,
    recordatoriosVacunacion: true,
    
    // Horarios de ordeño
    ordenoManana: '05:00',
    ordenoTarde: '16:00',
    
    // Razas disponibles
    razasPersonalizadas: ['Holstein', 'Jersey', 'Angus', 'Brahman', 'Simmental']
  });

  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: 'Juan Pérez', email: 'juan.perez@gmail.com', rol: 'Administrador', activo: true },
    { id: 2, nombre: 'María García', email: 'maria.garcia@gmail.com', rol: 'Operador', activo: true },
    { id: 3, nombre: 'Carlos López', email: 'carlos.lopez@gmail.com', rol: 'Veterinario', activo: false }
  ]);

  const [modalUsuario, setModalUsuario] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '',
    email: '',
    rol: 'Operador',
    password: ''
  });

  const [nuevaRaza, setNuevaRaza] = useState('');
  const [backupStatus, setBackupStatus] = useState('Último backup: 15/01/2024 - 08:30');

  const handleConfigChange = (field, value) => {
    setConfiguracion(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayConfigChange = (field, newArray) => {
    setConfiguracion(prev => ({
      ...prev,
      [field]: newArray
    }));
  };

  const agregarRaza = () => {
    if (nuevaRaza.trim() && !configuracion.razasPersonalizadas.includes(nuevaRaza.trim())) {
      const razasActualizadas = [...configuracion.razasPersonalizadas, nuevaRaza.trim()];
      handleArrayConfigChange('razasPersonalizadas', razasActualizadas);
      setNuevaRaza('');
    }
  };

  const eliminarRaza = (raza) => {
    const razasActualizadas = configuracion.razasPersonalizadas.filter(r => r !== raza);
    handleArrayConfigChange('razasPersonalizadas', razasActualizadas);
  };

  const abrirModalUsuario = (usuario = null) => {
    if (usuario) {
      setUsuarioEditando(usuario);
      setNuevoUsuario({
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        password: ''
      });
    } else {
      setUsuarioEditando(null);
      setNuevoUsuario({
        nombre: '',
        email: '',
        rol: 'Operador',
        password: ''
      });
    }
    setModalUsuario(true);
  };

  const cerrarModalUsuario = () => {
    setModalUsuario(false);
    setUsuarioEditando(null);
  };

  const guardarUsuario = () => {
    if (usuarioEditando) {
      setUsuarios(usuarios.map(u => 
        u.id === usuarioEditando.id 
          ? { ...u, nombre: nuevoUsuario.nombre, email: nuevoUsuario.email, rol: nuevoUsuario.rol }
          : u
      ));
    } else {
      const id = Math.max(...usuarios.map(u => u.id)) + 1;
      setUsuarios([...usuarios, {
        ...nuevoUsuario,
        id,
        activo: true
      }]);
    }
    cerrarModalUsuario();
  };

  const toggleUsuarioActivo = (id) => {
    setUsuarios(usuarios.map(u => 
      u.id === id ? { ...u, activo: !u.activo } : u
    ));
  };

  const eliminarUsuario = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      setUsuarios(usuarios.filter(u => u.id !== id));
    }
  };

  const realizarBackup = () => {
    setBackupStatus('Realizando backup...');
    setTimeout(() => {
      setBackupStatus(`Último backup: ${new Date().toLocaleDateString('es-ES')} - ${new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`);
    }, 2000);
  };

  const exportarConfiguracion = () => {
    // Simulación de exportación, puedes usar 'configuracion' si lo necesitas
    alert('Configuración exportada (funcionalidad simulada)');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Configuración del Sistema</h1>
          <p className="text-gray-600">Personaliza tu aplicación Milk Manager</p>
        </div>
        <button
          onClick={exportarConfiguracion}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <span>💾</span>
          <span>Exportar Config</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Información de la Finca */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Información de la Finca</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de la Finca
                </label>
                <input
                  type="text"
                  value={configuracion.nombreFinca}
                  onChange={(e) => handleConfigChange('nombreFinca', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Propietario
                </label>
                <input
                  type="text"
                  value={configuracion.propietario}
                  onChange={(e) => handleConfigChange('propietario', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dirección
                </label>
                <input
                  type="text"
                  value={configuracion.direccion}
                  onChange={(e) => handleConfigChange('direccion', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={configuracion.telefono}
                  onChange={(e) => handleConfigChange('telefono', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={configuracion.email}
                  onChange={(e) => handleConfigChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* Configuración del Sistema */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Configuración del Sistema</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Moneda
                </label>
                <select
                  value={configuracion.moneda}
                  onChange={(e) => handleConfigChange('moneda', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="COP">Peso Colombiano (COP)</option>
                  <option value="USD">Dólar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Precio por Litro de Leche
                </label>
                <input
                  type="number"
                  value={configuracion.precioLitroLeche}
                  onChange={(e) => handleConfigChange('precioLitroLeche', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Producción Diaria (L)
                </label>
                <input
                  type="number"
                  value={configuracion.metaProduccionDiaria}
                  onChange={(e) => handleConfigChange('metaProduccionDiaria', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Producción Mensual (L)
                </label>
                <input
                  type="number"
                  value={configuracion.metaProduccionMensual}
                  onChange={(e) => handleConfigChange('metaProduccionMensual', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* Horarios de Ordeño */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Horarios de Ordeño</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ordeño Mañana
                </label>
                <input
                  type="time"
                  value={configuracion.ordenoManana}
                  onChange={(e) => handleConfigChange('ordenoManana', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ordeño Tarde
                </label>
                <input
                  type="time"
                  value={configuracion.ordenoTarde}
                  onChange={(e) => handleConfigChange('ordenoTarde', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* Gestión de Razas */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Razas Disponibles</h3>
            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                value={nuevaRaza}
                onChange={(e) => setNuevaRaza(e.target.value)}
                placeholder="Nueva raza..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={agregarRaza}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Agregar
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {configuracion.razasPersonalizadas.map((raza) => (
                <span
                  key={raza}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                >
                  {raza}
                  <button
                    onClick={() => eliminarRaza(raza)}
                    className="ml-2 text-green-600 hover:text-green-900"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Gestión de Usuarios */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Usuarios del Sistema</h3>
              <button
                onClick={() => abrirModalUsuario()}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Agregar Usuario
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {usuarios.map((usuario) => (
                    <tr key={usuario.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{usuario.nombre}</div>
                          <div className="text-sm text-gray-500">{usuario.email}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {usuario.rol}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          usuario.activo 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {usuario.activo ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => abrirModalUsuario(usuario)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => toggleUsuarioActivo(usuario.id)}
                          className={`${
                            usuario.activo 
                              ? 'text-red-600 hover:text-red-900' 
                              : 'text-green-600 hover:text-green-900'
                          }`}
                        >
                          {usuario.activo ? 'Desactivar' : 'Activar'}
                        </button>
                        <button
                          onClick={() => eliminarUsuario(usuario.id)}
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
        </div>

        {/* Panel lateral */}
        <div className="space-y-6">
          {/* Notificaciones */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Notificaciones</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={configuracion.notificacionesEmail}
                  onChange={(e) => handleConfigChange('notificacionesEmail', e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Notificaciones por Email</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={configuracion.alertasProduccion}
                  onChange={(e) => handleConfigChange('alertasProduccion', e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Alertas de Producción</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={configuracion.alertasSalud}
                  onChange={(e) => handleConfigChange('alertasSalud', e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Alertas de Salud</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={configuracion.recordatoriosVacunacion}
                  onChange={(e) => handleConfigChange('recordatoriosVacunacion', e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Recordatorios de Vacunación</span>
              </label>
            </div>
          </div>

          {/* Respaldo y Mantenimiento */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Respaldo y Mantenimiento</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">{backupStatus}</p>
                <button
                  onClick={realizarBackup}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Realizar Backup Ahora
                </button>
              </div>
              <div>
                <button className="w-full bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition-colors">
                  Limpiar Datos Antiguos
                </button>
              </div>
              <div>
                <button className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
                  Restablecer Sistema
                </button>
              </div>
            </div>
          </div>

          {/* Información del Sistema */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Información del Sistema</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Versión:</span>
                <span className="font-medium">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Base de Datos:</span>
                <span className="font-medium">MongoDB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Servidor:</span>
                <span className="font-medium">Node.js</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estado:</span>
                <span className="text-green-600 font-medium">Operativo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex justify-end space-x-3">
        <button className="px-6 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
          Cancelar
        </button>
        <button 
          onClick={() => alert('Configuración guardada exitosamente')}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Guardar Configuración
        </button>
      </div>

      {/* Modal para agregar/editar usuario */}
      {modalUsuario && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {usuarioEditando ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  value={nuevoUsuario.nombre}
                  onChange={(e) => setNuevoUsuario({...nuevoUsuario, nombre: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Juan Pérez"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={nuevoUsuario.email}
                  onChange={(e) => setNuevoUsuario({...nuevoUsuario, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="juan@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rol
                </label>
                <select
                  value={nuevoUsuario.rol}
                  onChange={(e) => setNuevoUsuario({...nuevoUsuario, rol: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Operador">Operador</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Veterinario">Veterinario</option>
                  <option value="Solo Lectura">Solo Lectura</option>
                </select>
              </div>
              {!usuarioEditando && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contraseña Temporal
                  </label>
                  <input
                    type="password"
                    value={nuevoUsuario.password}
                    onChange={(e) => setNuevoUsuario({...nuevoUsuario, password: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={cerrarModalUsuario}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={guardarUsuario}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {usuarioEditando ? 'Actualizar' : 'Crear Usuario'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfiguracionPage;