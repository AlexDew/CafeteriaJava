import { useState } from "react";

function VentaForm() {

  const [cliente, setCliente] = useState("");
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState("");

  const registrarVenta = () => {

    const nuevaVenta = {
      cliente,
      producto,
      cantidad
    };

    console.log(nuevaVenta);

    alert("Venta registrada");
  };

  return (
    <div>

      <h3>Nueva Venta</h3>

      <input
        type="text"
        placeholder="Cliente"
        onChange={(e) => setCliente(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Producto"
        onChange={(e) => setProducto(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Cantidad"
        onChange={(e) => setCantidad(e.target.value)}
      />

      <br /><br />

      <button onClick={registrarVenta}>
        Registrar
      </button>

    </div>
  );
}

export default VentaForm;