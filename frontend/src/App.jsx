import "./App.css";
import "./components/inicioSesion.jsx"
import Login from "./components/inicioSesion.jsx";
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
    </>
  )
}
export default App;
