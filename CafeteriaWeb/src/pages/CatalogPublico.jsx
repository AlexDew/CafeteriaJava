import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerProductos } from '../services/api';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function CatalogPublico() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setCargando(true);
      const data = await obtenerProductos();
      setProductos(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  const categorias = [...new Set(productos.map(p => p.categoria))];
  const productosFiltrados = filtroCategoria
    ? productos.filter(p => p.categoria === filtroCategoria)
    : productos;

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      
      <main className="flex-grow-1 w-100">
        <div className="container-fluid p-0 m-0">
          <div className="content-wrapper p-5">
            <h1 className="display-4 mb-2">
              <i className="bi bi-cup-hot-fill text-brown me-3"></i>
              Catálogo de Productos
            </h1>
            <p className="lead text-muted">
              Descubre nuestras deliciosas opciones disponibles
            </p>

            {/* Filtros */}
            <div className="mb-4 mt-4">
              <h5 className="mb-3">Filtrar por categoría:</h5>
              <div className="d-flex flex-wrap gap-2">
                <button
                  className={`btn ${filtroCategoria === '' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setFiltroCategoria('')}
                >
                  Todas
                </button>
                {categorias.map(cat => (
                  <button
                    key={cat}
                    className={`btn ${filtroCategoria === cat ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setFiltroCategoria(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Productos */}
            {cargando ? (
              <div className="text-center py-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
              </div>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : productosFiltrados.length === 0 ? (
              <div className="alert alert-info">
                <i className="bi bi-info-circle me-2"></i>
                No hay productos disponibles
              </div>
            ) : (
              <div className="row">
                {productosFiltrados.map(producto => (
                  <div key={producto.id} className="col-md-6 col-lg-4 mb-4">
                    <div className="card h-100 product-card">
                      <div className="card-body">
                        <h5 className="card-title">{producto.nombre}</h5>
                        <p className="text-muted small mb-2">
                          <i className="bi bi-tag me-1"></i>
                          {producto.categoria}
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="h5 text-success mb-0">${producto.precio.toFixed(2)}</span>
                          <span className={`badge ${producto.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                            {producto.stock > 0 ? `${producto.stock} disponibles` : 'Agotado'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
