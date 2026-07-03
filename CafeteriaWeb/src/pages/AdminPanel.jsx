import { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import GestionVendedores from '../modules/admin/GestionVendedores';
import GestionProductos from '../modules/admin/GestionProductos';
import ReportesAdmin from '../modules/admin/ReportesAdmin';

export default function AdminPanel() {
  const [vista, setVista] = useState('vendedores');

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="flex-grow-1 py-4">
        <div className="container-fluid">
          <div className="row mb-4">
            <div className="col">
              <h1 className="display-5">
                <i className="bi bi-gear-fill text-danger me-2"></i>
                Panel de Administración
              </h1>
            </div>
          </div>

          {/* Tabs de navegación */}
          <ul className="nav nav-tabs mb-4" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${vista === 'vendedores' ? 'active' : ''}`}
                onClick={() => setVista('vendedores')}
              >
                <i className="bi bi-people-fill me-2"></i>
                Vendedores
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${vista === 'productos' ? 'active' : ''}`}
                onClick={() => setVista('productos')}
              >
                <i className="bi bi-box-seam me-2"></i>
                Productos
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${vista === 'reportes' ? 'active' : ''}`}
                onClick={() => setVista('reportes')}
              >
                <i className="bi bi-graph-up me-2"></i>
                Reportes
              </button>
            </li>
          </ul>

          {/* Contenido de las vistas */}
          <div className="tab-content">
            {vista === 'vendedores' && <GestionVendedores />}
            {vista === 'productos' && <GestionProductos />}
            {vista === 'reportes' && <ReportesAdmin />}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
