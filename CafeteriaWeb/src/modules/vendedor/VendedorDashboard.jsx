import { useState, useEffect, useCallback } from 'react';
import ProductoList from './ProductoList';
import RegistrarVenta from './RegistrarVenta';
import ReporteVentas from './ReporteVentas';
import { obtenerProductos, registrarVenta } from '../../services/api';

export default function VendedorDashboard() {
  const [vista, setVista] = useState('vender');
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  const cargarProductos = useCallback(async () => {
    try {
      setCargando(true);
      const data = await obtenerProductos();
      setProductos(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarProductos();
  }, [cargarProductos]);

  const agregarAlCarrito = (producto, cantidad) => {
    setCarrito((prev) => {
      const existente = prev.find((i) => i.productoId === producto.id);
      if (existente) {
        return prev.map((i) =>
          i.productoId === producto.id ? { ...i, cantidad: i.cantidad + cantidad } : i
        );
      }
      return [
        ...prev,
        { productoId: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad },
      ];
    });
  };

  const quitarDelCarrito = (productoId) => {
    setCarrito((prev) => prev.filter((i) => i.productoId !== productoId));
  };

  const confirmarVenta = async () => {
    try {
      const items = carrito.map((i) => ({ productoId: i.productoId, cantidad: i.cantidad }));
      await registrarVenta({ vendedorId: 1, items });
      setCarrito([]);
      setMensaje({ tipo: 'success', texto: 'Venta registrada correctamente' });
      await cargarProductos();
    } catch (err) {
      setMensaje({ tipo: 'danger', texto: err.message });
    }
  };

  return (
    <div className="container py-4">
      <ul className="nav nav-pills mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${vista === 'vender' ? 'active' : ''}`}
            onClick={() => setVista('vender')}
          >
            <i className="bi bi-cart3 me-1"></i>Vender
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${vista === 'reporte' ? 'active' : ''}`}
            onClick={() => setVista('reporte')}
          >
            <i className="bi bi-bar-chart-line me-1"></i>Reporte
          </button>
        </li>
      </ul>

      {mensaje && (
        <div className={`alert alert-${mensaje.tipo} alert-dismissible`} role="alert">
          {mensaje.texto}
          <button
            type="button"
            className="btn-close"
            onClick={() => setMensaje(null)}
          ></button>
        </div>
      )}

      {vista === 'vender' && (
        <div className="row">
          <div className="col-lg-7">
            {cargando && <p className="text-muted">Cargando productos...</p>}
            {error && <div className="alert alert-danger">{error}</div>}
            {!cargando && !error && (
              <ProductoList productos={productos} onAgregar={agregarAlCarrito} />
            )}
          </div>
          <div className="col-lg-5">
            <RegistrarVenta
              carrito={carrito}
              onQuitar={quitarDelCarrito}
              onConfirmar={confirmarVenta}
            />
          </div>
        </div>
      )}

      {vista === 'reporte' && <ReporteVentas />}
    </div>
  );
}