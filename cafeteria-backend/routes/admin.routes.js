const { Router } = require('express');
const AdminController = require('../controllers/AdminController');
const { autenticar, autorizarRol } = require('../middleware/auth');

const router = Router();
const controller = new AdminController();

// Aplicar autenticación a todas las rutas
router.use(autenticar);
router.use(autorizarRol('admin'));

// Gestión de vendedores
router.get('/vendedores', controller.listarVendedores);
router.post('/vendedores', controller.crearVendedor);
router.put('/vendedores/:id', controller.actualizarVendedor);
router.delete('/vendedores/:id', controller.desactivarVendedor);

// Gestión de productos
router.get('/productos', controller.listarProductos);
router.post('/productos', controller.crearProducto);
router.put('/productos/:id', controller.actualizarProducto);
router.delete('/productos/:id', controller.eliminarProducto);

// Reportes
router.get('/reportes/ventas', controller.reporteVentas);

module.exports = router;
