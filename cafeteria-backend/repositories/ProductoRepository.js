const fs = require('fs');
const path = require('path');
const Producto = require('../models/Producto');

const DATA_PATH = path.join(__dirname, '../data/productos.json');

class ProductoRepository {
  _leer() {
    const raw = fs.readFileSync(DATA_PATH, 'utf-8');
    return JSON.parse(raw).map((p) => new Producto(p));
  }

  _guardar(productos) {
    fs.writeFileSync(DATA_PATH, JSON.stringify(productos, null, 2), 'utf-8');
  }

  obtenerTodos() {
    return this._leer();
  }

  obtenerPorId(id) {
    const producto = this._leer().find((p) => p.id === id);
    if (!producto) throw new Error(`Producto ${id} no encontrado`);
    return producto;
  }

  actualizarStock(id, nuevoStock) {
    const productos = this._leer();
    const producto = productos.find((p) => p.id === id);
    if (!producto) throw new Error(`Producto ${id} no encontrado`);
    producto.stock = nuevoStock;
    this._guardar(productos);
    return producto;
  }

  crear(datos) {
    const productos = this._leer();
    const nuevoId = Math.max(...productos.map(p => p.id), 0) + 1;
    const nuevoProducto = new Producto({
      id: nuevoId,
      ...datos,
      stock: datos.stock || 0
    });
    productos.push(nuevoProducto);
    this._guardar(productos);
    return nuevoProducto;
  }

  actualizar(id, datos) {
    const productos = this._leer();
    const index = productos.findIndex(p => p.id === id);
    if (index === -1) throw new Error(`Producto ${id} no encontrado`);
    
    const producto = productos[index];
    Object.assign(producto, datos);
    this._guardar(productos);
    return producto;
  }

  eliminar(id) {
    const productos = this._leer();
    const index = productos.findIndex(p => p.id === id);
    if (index === -1) throw new Error(`Producto ${id} no encontrado`);
    
    productos.splice(index, 1);
    this._guardar(productos);
  }
}

module.exports = ProductoRepository;