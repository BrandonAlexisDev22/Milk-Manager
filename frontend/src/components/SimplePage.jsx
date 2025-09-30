const SimplePage = ({ title, description, setCurrentPage }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200 text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>
      <div className="text-6xl mb-4">🚧</div>
      <p className="text-sm text-gray-500">Esta sección estará disponible próximamente</p>
      <button
        onClick={() => setCurrentPage('dashboard')}
        className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
      >
        Volver al Dashboard
      </button>
    </div>
  </div>
);

export default SimplePage;