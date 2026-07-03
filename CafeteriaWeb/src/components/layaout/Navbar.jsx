export default function Navbar({ modulo = 'vendedor', rol = 'Vendedor' }) {
  const enlaces = [
    { id: 'cliente', label: 'Catálogo', href: '#' },
    { id: 'vendedor', label: 'Ventas', href: '#' },
    { id: 'administrador', label: 'Administración', href: '#' },
  ];

  return (
    <nav className="navbar navbar-expand-lg cafe-navbar">
      <div className="container">
        <a className="navbar-brand" href="#">
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {enlaces.map((enlace) => (
              <li className="nav-item" key={enlace.id}>
                
                  className={`nav-link ${modulo === enlace.id ? 'active' : ''}`}
                  href={enlace.href}
                  
                  {enlace.label}
                
              </li>
            ))}
          </ul>
          <span className="badge badge-rol rounded-pill px-3 py-2">
            <i className="bi bi-person-circle me-1"></i>
            {rol}
          </span>
        </div>
      </div>
    </nav>
  );
}