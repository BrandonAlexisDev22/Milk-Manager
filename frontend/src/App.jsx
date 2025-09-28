import { useState } from 'react';
import Login from './components/inicioSesion';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setCurrentUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard setCurrentPage={setCurrentPage} />;
      case 'animales':
        return <SimplePage title="Gestión de Animales" description="Administra tu ganado" setCurrentPage={setCurrentPage} />;
      case 'produccion':
        return <SimplePage title="Control de Producción" description="Registra la producción lechera" setCurrentPage={setCurrentPage} />;
      case 'reportes':
        return <SimplePage title="Reportes y Análisis" description="Analiza métricas detalladas" setCurrentPage={setCurrentPage} />;
      case 'configuracion':
        return <SimplePage title="Configuración" description="Personaliza tu aplicación" setCurrentPage={setCurrentPage} />;
      default:
        return <Dashboard setCurrentPage={setCurrentPage} />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout 
      user={currentUser} 
      onLogout={handleLogout}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    >
      {renderCurrentPage()}
    </Layout>
  );
}

export default App;