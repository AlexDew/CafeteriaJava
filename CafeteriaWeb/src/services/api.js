import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const cliente = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para incluir token
cliente.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ========== AUTENTICACIÓN ==========
export async function login(email, password) {
  const response = await cliente.post('/auth/login', { email, password });
  return response.data;
}

export async function verificarToken() {
  const response = await cliente.get('/auth/verificar');
  return response.data;
}

// ========== PRODUCTOS ==========
export async function obtenerProductos() {
  const response = await cliente.get('/productos');
  return response.data;
}

export async function registrarVenta({ vendedorId, items }) {
  const response = await cliente.post('/ventas', { vendedorId, items });
  return response.data;
}

export async function obtenerHistorialVentas() {
  const response = await cliente.get('/ventas');
  return response.data;
}

export async function obtenerReporteVentas() {
  const response = await cliente.get('/ventas/reporte');
  return response.data;
}

// ========== ADMIN - VENDEDORES ==========
export async function obtenerVendedores() {
  const response = await cliente.get('/admin/vendedores');
  return response.data;
}

export async function crearVendedor(email, nombre) {
  const response = await cliente.post('/admin/vendedores', { email, nombre });
  return response.data;
}

export async function actualizarVendedor(id, datos) {
  const response = await cliente.put(`/admin/vendedores/${id}`, datos);
  return response.data;
}

export async function desactivarVendedor(id) {
  const response = await cliente.delete(`/admin/vendedores/${id}`);
  return response.data;
}

// ========== ADMIN - PRODUCTOS ==========
export async function obtenerProductosAdmin() {
  const response = await cliente.get('/admin/productos');
  return response.data;
}

export async function crearProducto(datos) {
  const response = await cliente.post('/admin/productos', datos);
  return response.data;
}

export async function actualizarProducto(id, datos) {
  const response = await cliente.put(`/admin/productos/${id}`, datos);
  return response.data;
}

export async function eliminarProducto(id) {
  const response = await cliente.delete(`/admin/productos/${id}`);
  return response.data;
}

// ========== ADMIN - REPORTES ==========
export async function obtenerReporteAdmin() {
  const response = await cliente.get('/admin/reportes/ventas');
  return response.data;
}

export default cliente;