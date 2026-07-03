import { useState } from 'react';

export default function ProductoList({ productos, onAgregar }) {
  const [cantidades, setCantidades] = useState({});

  const cambiarCantidad = (id, valor) => {
    setCantidades((prev) => ({ ...prev, [id]: Number(valor) }));
  };

  const handleAgregar = (producto) => {
    const cantidad = cantidades[producto.id] || 1;
    if (cantidad < 1) return;
    if (cantidad > producto.stock) {
      alert(`Solo hay ${producto.stock} unidades de "${producto.nombre}"`);
      return;
    }
    onAgregar(producto, cantidad);
    setCantidades((prev) => ({ ...prev, [producto.id]: 1 }));
  };

  return (
    <div className="cafe-card p-3 mb-4">
      <h4 className="font-display mb-3">
        <i className="bi bi-cup-straw me-2"></i>Catálogo
      </h4>
      <div className="table-responsive">
        <table className="table cafe-table align-middle mb-0">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Stock</th>
              <th style={{ width: '110px' }}>Cantidad</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>
                  <div className="fw-semibold">{producto.nombre}</div>
                  <small className="text-muted">{producto.categoria}</small>
                </td>
                <td>S/ {producto.precio.toFixed(2)}</td>
                <td>
                  <span
                    className={`badge rounded-pill ${
                      producto.stock === 0
                        ? 'text-bg-danger'
                        : producto.stock <= 5
                        ? 'text-bg-warning'
                        : 'text-bg-success'
                    }`}
                  >
                    {producto.stock} und.
                  </span>
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    min="1"
                    max={producto.stock}
                    value={cantidades[producto.id] || 1}
                    onChange={(e) => cambiarCantidad(producto.id, e.target.value)}
                    disabled={producto.stock === 0}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleAgregar(producto)}
                    disabled={producto.stock === 0}
                  >
                    <i className="bi bi-plus-lg"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}