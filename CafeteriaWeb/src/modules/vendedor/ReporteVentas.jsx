import { useEffect, useState } from 'react';
import { obtenerHistorialVentas, obtenerReporteVentas } from '../../services/api';

export default function ReporteVentas() {
  const [historial, setHistorial] = useState([]);
  const [reporte, setReporte] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargar() {
      try {
        const [h, r] = await Promise.all([obtenerHistorialVentas(), obtenerReporteVentas()]);
        setHistorial(h);
        setReporte(r);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    }
    cargar();
  }, []);

  if (cargando) return <p className="text-muted">Cargando reporte...</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <div className="row g-3 mb-4">
        <div className="col-sm-6 col-lg-3">
          <div className="cafe-card p-3 text-center">
            <div className="text-muted small">Ventas totales</div>
            <div className="font-display fs-3">{reporte.totalVentas}</div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="cafe-card p-3 text-center">
            <div className="text-muted small">Total generado</div>
            <div className="font-display fs-3">S/ {reporte.totalGeneral.toFixed(2)}</div>
          </div>
        </div>
      </div>

      <div className="cafe-card p-3 mb-4">
        <h5 className="font-display mb-3">Por producto</h5>
        <div className="table-responsive">
          <table className="table cafe-table align-middle mb-0">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad vendida</th>
                <th>Total generado</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(reporte.porProducto).map(([nombre, datos]) => (
                <tr key={nombre}>
                  <td>{nombre}</td>
                  <td>{datos.cantidadVendida}</td>
                  <td>S/ {datos.totalGenerado.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="cafe-card p-3">
        <h5 className="font-display mb-3">Historial de ventas</h5>
        <div className="table-responsive">
          <table className="table cafe-table align-middle mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Items</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {historial.map((venta) => (
                <tr key={venta.id}>
                  <td>#{venta.id}</td>
                  <td>{new Date(venta.fecha).toLocaleString()}</td>
                  <td>{venta.items.map((i) => `${i.nombre} x${i.cantidad}`).join(', ')}</td>
                  <td>S/ {venta.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}