import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { usuario, logout, token } = useAuth();

  const manejarLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg cafe-navbar">
      <div className="container">
        <a className="navbar-brand" href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
          <i className="bi bi-cup-hot-fill me-2"></i>
          Cafeteria<span>Web</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCafe"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarCafe">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {token && usuario ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">
                    <i className="bi bi-person-circle me-2"></i>
                    {usuario.nombre}
                  </span>
                </li>
                <li className="nav-item">
                  <span className={`badge ms-2 ${
                    usuario.rol === 'admin' ? 'bg-danger' : 'bg-primary'
                  }`}>
                    {usuario.rol.toUpperCase()}
                  </span>
                </li>
                <li className="nav-item ms-3">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={manejarLogout}
                  >
                    <i className="bi bi-box-arrow-right me-1"></i>
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button
                  className="btn btn-success"
                  onClick={() => navigate('/login')}
                >
                  <i className="bi bi-box-arrow-in-right me-1"></i>
                  Iniciar Sesión
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}