import { useState } from 'react';
import Login from './components/inicioSesion';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import AnimalesPage from './components/GestionAnimales';
import ProduccionPage from './components/ControlProduccion';
import SimplePage from './components/SimplePage';
import ReportesPage from './components/Reportes';
import ConfiguracionPage from './components/Configuracion';

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
        return <AnimalesPage />;
      case 'produccion':
        return <ProduccionPage />; 
      case 'reportes':
        return <ReportesPage />
      case 'configuracion':
        return <ConfiguracionPage />
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