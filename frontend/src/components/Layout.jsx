import { useState } from 'react';

const Layout = ({ children, user, onLogout, currentPage, onPageChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: '📊',
      description: 'Vista general'
    },
    {
      id: 'animales',
      name: 'Animales',
      icon: '🐄',
      description: 'Gestión del ganado'
    },
    {
      id: 'produccion',
      name: 'Producción',
      icon: '🥛',
      description: 'Control lechero'
    },
    {
      id: 'reportes',
      name: 'Reportes',
      icon: '📈',
      description: 'Análisis y métricas'
    },
    {
      id: 'configuracion',
      name: 'Configuración',
      icon: '⚙️',
      description: 'Ajustes del sistema'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-green-800 text-white transition-all duration-300 flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-green-700">
          <div className="flex items-center justify-between">
            <div className={`${!sidebarOpen && 'hidden'} transition-all duration-300`}>
              <h1 className="text-xl font-bold">Milk Manager</h1>
              <p className="text-sm text-green-200">Sistema Ganadero</p>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-green-700 rounded-lg transition-colors"
            >
              {sidebarOpen ? '←' : '→'}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center p-3 rounded-lg transition-colors text-left ${
                currentPage === item.id
                  ? 'bg-green-600 text-white'
                  : 'hover:bg-green-700 text-green-100'
              }`}
            >
              <span className="text-xl mr-3">{item.icon}</span>
              <div className={`${!sidebarOpen && 'hidden'} transition-all duration-300`}>
                <div className="font-medium">{item.name}</div>
                <div className="text-xs text-green-200">{item.description}</div>
              </div>
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-green-700">
          <div className="flex items-center justify-between">
            <div className={`${!sidebarOpen && 'hidden'} transition-all duration-300`}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-sm">{user?.name || 'Usuario'}</div>
                  <div className="text-xs text-green-200">{user?.email || 'usuario@email.com'}</div>
                </div>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="p-2 hover:bg-green-700 rounded-lg transition-colors"
              title="Cerrar sesión"
            >
              🚪
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 capitalize">
              {currentPage}
            </h2>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                {new Date().toLocaleDateString('es-ES', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;