export default function Footer() {
  return (
    <footer className="cafe-footer">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
        <span>
          <i className="bi bi-cup-hot-fill me-1"></i>
          CafeteriaWeb &copy; {new Date().getFullYear()} — Proyecto académico UTP
        </span>
        <span>
          Módulos: Login · Administrador · Vendedor · Cliente
        </span>
      </div>
    </footer>
  );
}