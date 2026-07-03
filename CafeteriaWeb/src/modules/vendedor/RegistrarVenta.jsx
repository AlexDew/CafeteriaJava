export default function RegistrarVenta({ carrito, onQuitar, onConfirmar }) {
  const total = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);

  return (
    <div className="cafe-card p-3 mb-4">
      <h4 className="font-display mb-3">
        <i className="bi bi-receipt me-2"></i>Venta actual
      </h4>

      {carrito.length === 0 ? (
        <p className="text-muted mb-0">Aún no agregaste productos.</p>
      ) : (
        <>
          <ul className="list-group list-group-flush mb-3">
            {carrito.map((item) => (
              <li
                key={item.productoId}
                className="list-group-item d-flex justify-content-between align-items-center px-0"
              >
                <div>
                  <div className="fw-semibold">{item.nombre}</div>
                  <small className="text-muted">
                    {item.cantidad} x S/ {item.precio.toFixed(2)}
                  </small>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <span className="fw-semibold">
                    S/ {(item.precio * item.cantidad).toFixed(2)}
                  </span>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => onQuitar(item.productoId)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="d-flex justify-content-between align-items-center border-top pt-3">
            <span className="font-display fs-5">Total: S/ {total.toFixed(2)}</span>
            <button className="btn btn-primary" onClick={onConfirmar}>
              <i className="bi bi-check2-circle me-1"></i>Confirmar venta
            </button>
          </div>
        </>
      )}
    </div>
  );
}