import { useState } from 'react';

export default function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simular autenticación (en producción conectarías con tu API)
    try {
      // Validación básica
      if (!formData.email || !formData.password) {
        throw new Error('Por favor completa todos los campos');
      }

      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Datos de usuario simulados
      const userData = {
        id: 1,
        name: formData.email.split('@')[0],
        email: formData.email,
        role: 'admin'
      };

      onLogin(userData);
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-br from-green-50 to-green-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🥛</div>
          <h2 className="text-3xl font-bold tracking-tight text-green-800">
            Milk Manager
          </h2>
          <p className="mt-2 text-green-600">Sistema de Gestión Ganadera</p>
        </div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
          <div className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-green-700">
                Usuario o Correo Electrónico
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-green-50 px-3 py-2 text-base text-green-900 placeholder:text-green-400 border border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-colors"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-green-700">
                Contraseña
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-green-50 px-3 py-2 text-base text-green-900 placeholder:text-green-400 border border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className={`flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white transition-all ${
                  loading
                    ? 'bg-green-400 cursor-not-allowed'
                    : 'bg-green-700 hover:bg-green-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700'
                }`}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Ingresando...
                  </div>
                ) : (
                  'Ingresar'
                )}
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Demo: Usa cualquier email y contraseña para ingresar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}