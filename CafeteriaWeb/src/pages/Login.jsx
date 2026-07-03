import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/login.css';

export default function Login() {
  const [email, setEmail] = useState('admin@cafeteria.com');
  const [password, setPassword] = useState('cafe2024');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');

    try {
      const usuario = await login(email, password);
      
      if (usuario.rol === 'admin') {
        navigate('/admin');
      } else if (usuario.rol === 'vendedor') {
        navigate('/vendedor');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <i className="bi bi-cup-hot-fill login-icon"></i>
          <h1>CafeteriaWeb</h1>
          <p className="subtitle">Sistema de Ventas</p>
        </div>

        <form onSubmit={manejarSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg w-100"
            disabled={cargando}
          >
            {cargando ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="login-footer">
          <p className="text-muted mb-2">Credenciales de prueba:</p>
          <small className="d-block">
            <strong>Admin:</strong> admin@cafeteria.com / cafe2024
          </small>
          <small className="d-block">
            <strong>Vendedor:</strong> vendedor1@cafeteria.com / cafe2024
          </small>
        </div>
      </div>
    </div>
  );
}
