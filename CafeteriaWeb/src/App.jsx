import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RutaProtegida } from './components/RutaProtegida';
import CatalogPublico from './pages/CatalogPublico';
import Login from './pages/Login';
import VendedorPanel from './pages/VendedorPanel';
import AdminPanel from './pages/AdminPanel';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<CatalogPublico />} />
          
          <Route path="/login" element={<Login />} />
          
          <Route
            path="/vendedor"
            element={
              <RutaProtegida rolesPermitidos={['vendedor']}>
                <VendedorPanel />
              </RutaProtegida>
            }
          />
          
          <Route
            path="/admin"
            element={
              <RutaProtegida rolesPermitidos={['admin']}>
                <AdminPanel />
              </RutaProtegida>
            }
          />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;