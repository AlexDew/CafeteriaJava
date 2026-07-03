const Usuario = require('../models/Usuario');
const ProductoRepository = require('../repositories/ProductoRepository');
const fs = require('fs');
const path = require('path');

class AdminController {
  constructor() {
    this.productoRepo = new ProductoRepository();
  }

  // ========== GESTIÓN DE USUARIOS ==========
  listarVendedores = (req, res) => {
    try {
      const usuarios = Usuario.obtenerTodos();
      const vendedores = usuarios.filter(u => u.rol === 'vendedor');
      res.json(vendedores);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  crearVendedor = (req, res) => {
    try {
      const { email, nombre } = req.body;
      if (!email || !nombre) {
        return res.status(400).json({ error: 'Email y nombre requeridos' });
      }

      const existe = Usuario.obtenerPorEmail(email);
      if (existe) {
        return res.status(400).json({ error: 'El email ya está registrado' });
      }

      const nuevo = Usuario.crear({
        email,
        nombre,
        password: 'cafe2024', // contraseña por defecto
        rol: 'vendedor'
      });

      res.status(201).json(nuevo);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  actualizarVendedor = (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, activo } = req.body;
      
      const usuario = Usuario.actualizar(Number(id), { nombre, activo });
      res.json(usuario);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  desactivarVendedor = (req, res) => {
    try {
      const { id } = req.params;
      const usuario = Usuario.actualizar(Number(id), { activo: false });
      res.json(usuario);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // ========== GESTIÓN DE PRODUCTOS ==========
  crearProducto = (req, res) => {
    try {
      const { nombre, precio, stock, categoria } = req.body;
      if (!nombre || !precio || !stock || !categoria) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
      }

      const producto = this.productoRepo.crear({
        nombre,
        precio: Number(precio),
        stock: Number(stock),
        categoria
      });

      res.status(201).json(producto);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  actualizarProducto = (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, precio, stock, categoria } = req.body;

      const producto = this.productoRepo.actualizar(Number(id), {
        nombre,
        precio: precio ? Number(precio) : undefined,
        stock: stock ? Number(stock) : undefined,
        categoria
      });

      res.json(producto);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  eliminarProducto = (req, res) => {
    try {
      const { id } = req.params;
      this.productoRepo.eliminar(Number(id));
      res.json({ mensaje: 'Producto eliminado' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  listarProductos = (req, res) => {
    try {
      const productos = this.productoRepo.obtenerTodos();
      res.json(productos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // ========== REPORTES ==========
  reporteVentas = (req, res) => {
    try {
      const rutaVentas = path.join(__dirname, '../data/ventas.json');
      const datos = fs.readFileSync(rutaVentas, 'utf8');
      const ventas = JSON.parse(datos);

      const reporte = {
        totalVentas: ventas.length,
        ingresoTotal: ventas.reduce((sum, v) => sum + v.total, 0),
        ventasPorVendedor: {},
        productosVendidos: {}
      };

      ventas.forEach(venta => {
        reporte.ventasPorVendedor[venta.vendedorId] = (reporte.ventasPorVendedor[venta.vendedorId] || 0) + 1;
        
        venta.items.forEach(item => {
          if (!reporte.productosVendidos[item.nombre]) {
            reporte.productosVendidos[item.nombre] = { cantidad: 0, total: 0 };
          }
          reporte.productosVendidos[item.nombre].cantidad += item.cantidad;
          reporte.productosVendidos[item.nombre].total += item.subtotal;
        });
      });

      res.json(reporte);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
}

module.exports = AdminController;
