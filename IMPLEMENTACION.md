# Sistema Web para Cafetería - Implementación Completa

## 🎯 Descripción General

Sistema web completo para una cafetería con tres roles:
- **Cliente (Público)**: Visualiza catálogo sin login
- **Vendedor**: Registra ventas, consulta historial
- **Administrador**: Gestiona vendedores, productos, inventario y reportes

## 📋 Cambios Implementados

### Backend (Node.js + Express)

#### Nuevas Dependencias
- `jsonwebtoken` (JWT) para autenticación
- `bcryptjs` para encriptación de contraseñas
- `cors` (ya existente)

#### Nuevos Archivos
1. **`middleware/auth.js`** - Middleware de autenticación y autorización
2. **`models/Usuario.js`** - Modelo de Usuario con CRUD
3. **`controllers/AuthController.js`** - Login y verificación de token
4. **`controllers/AdminController.js`** - Gestión de vendedores, productos, reportes
5. **`routes/auth.routes.js`** - Rutas de autenticación
6. **`routes/admin.routes.js`** - Rutas administrativas
7. **`data/usuarios.json`** - Archivo de usuarios con credenciales de prueba

#### Archivos Modificados
- `package.json` - Agregadas dependencias
- `server.js` - Integradas nuevas rutas
- `repositories/ProductoRepository.js` - Agregados métodos crear, actualizar, eliminar

### Frontend (React + Vite)

#### Nuevas Dependencias
- `axios` - Para consumir API
- `react-router-dom` - Enrutamiento

#### Nuevas Páginas
1. **`pages/Login.jsx`** - Página de login
2. **`pages/CatalogPublico.jsx`** - Catálogo para clientes (sin login)
3. **`pages/AdminPanel.jsx`** - Panel de administrador
4. **`pages/VendedorPanel.jsx`** - Panel de vendedor

#### Nuevos Módulos/Componentes
1. **`context/AuthContext.jsx`** - Contexto global de autenticación
2. **`components/RutaProtegida.jsx`** - Componente para proteger rutas
3. **`modules/admin/GestionVendedores.jsx`** - CRUD de vendedores
4. **`modules/admin/GestionProductos.jsx`** - CRUD de productos
5. **`modules/admin/ReportesAdmin.jsx`** - Reportes de ventas

#### Estilos
- **`styles/login.css`** - Estilos para página de login

#### Archivos Modificados
- `package.json` - Agregadas dependencias
- `src/App.jsx` - Implementado enrutamiento con React Router
- `src/components/layout/Navbar.jsx` - Actualizada con autenticación
- `src/services/api.js` - Integración con axios y autenticación
- `src/modules/vendedor/VendedorDashboard.jsx` - Integración con contexto de auth

## 🚀 Cómo Ejecutar

### Backend
```bash
cd cafeteria-backend
npm install
npm run dev        # Modo desarrollo con watch
# o
npm start          # Producción
```
El servidor corre en: **http://localhost:3001**

### Frontend
```bash
cd CafeteriaWeb
npm install
npm run dev        # Desarrollo con Vite
```
El cliente corre en: **http://localhost:5173**

## 🔐 Credenciales de Prueba

### Administrador
- **Email**: `admin@cafeteria.com`
- **Contraseña**: `cafe2024`

### Vendedor 1
- **Email**: `vendedor1@cafeteria.com`
- **Contraseña**: `cafe2024`

### Vendedor 2
- **Email**: `vendedor2@cafeteria.com`
- **Contraseña**: `cafe2024`

## 🔄 Flujo de la Aplicación

### 1. Página Pública (/home)
- Visualiza todos los productos
- Permite filtrar por categoría
- Botón "Iniciar Sesión" en la esquina

### 2. Login (/login)
- Email y contraseña
- Redirige automáticamente según rol:
  - Admin → `/admin`
  - Vendedor → `/vendedor`

### 3. Panel de Vendedor (/vendedor)
- **Vender**: Lista de productos + carrito + confirmar venta
- **Reporte**: Historial y estadísticas de ventas

### 4. Panel de Administrador (/admin)
- **Vendedores**: CRUD de vendedores (crear, activar, desactivar)
- **Productos**: CRUD de productos (crear, editar, eliminar)
- **Reportes**: Total de ventas, ingresos, ventas por vendedor, productos vendidos

## 📡 Endpoints API

### Autenticación
- `POST /api/auth/login` - Login
- `GET /api/auth/verificar` - Verificar token (requiere autenticación)

### Productos (Públicos)
- `GET /api/productos` - Listar productos
- `GET /api/productos/:id` - Obtener producto

### Ventas
- `POST /api/ventas` - Registrar venta
- `GET /api/ventas` - Historial de ventas
- `GET /api/ventas/reporte` - Reporte de ventas

### Administración (Requiere rol admin)
- `GET /api/admin/vendedores` - Listar vendedores
- `POST /api/admin/vendedores` - Crear vendedor
- `PUT /api/admin/vendedores/:id` - Actualizar vendedor
- `DELETE /api/admin/vendedores/:id` - Desactivar vendedor
- `GET /api/admin/productos` - Listar productos
- `POST /api/admin/productos` - Crear producto
- `PUT /api/admin/productos/:id` - Actualizar producto
- `DELETE /api/admin/productos/:id` - Eliminar producto
- `GET /api/admin/reportes/ventas` - Reporte completo de ventas

## 🔒 Seguridad

- Autenticación basada en JWT (JSON Web Tokens)
- Tokens válidos por 24 horas
- Middleware de autenticación en rutas protegidas
- Control de roles (admin y vendedor)
- Rutas protegidas en el frontend con RutaProtegida

## 📊 Estructura de Datos

### Usuario
```json
{
  "id": 1,
  "email": "usuario@cafeteria.com",
  "password": "hasheada",
  "nombre": "Nombre Usuario",
  "rol": "admin|vendedor",
  "activo": true
}
```

### Producto
```json
{
  "id": 1,
  "nombre": "Café Americano",
  "precio": 5.50,
  "stock": 14,
  "categoria": "Bebidas"
}
```

### Venta
```json
{
  "id": 1,
  "fecha": "2026-07-03T03:19:13.048Z",
  "vendedorId": 1,
  "items": [
    {
      "productoId": 1,
      "nombre": "Café americano",
      "cantidad": 2,
      "precioUnitario": 5.5,
      "subtotal": 11
    }
  ],
  "total": 11
}
```

## 🎨 Componentes Principales

### Context (Autenticación Global)
```jsx
const { usuario, token, cargando, login, logout } = useAuth();
```

### Componente de Ruta Protegida
```jsx
<RutaProtegida rolesPermitidos={['admin']}>
  <AdminPanel />
</RutaProtegida>
```

### Servicios API
```jsx
await login(email, password);
await obtenerProductos();
await registrarVenta({ vendedorId, items });
await obtenerVendedores(); // Admin
await crearProducto(datos); // Admin
```

## 🛠️ Próximas Mejoras (Opcional)

- [ ] Persistencia en base de datos real (MongoDB, PostgreSQL)
- [ ] Autenticación con email (confirmación de cuenta)
- [ ] Recuperación de contraseña
- [ ] Actualizacion automática de stock en tiempo real
- [ ] Gráficos más avanzados para reportes
- [ ] Exportar reportes a PDF/Excel
- [ ] Notificaciones en tiempo real
- [ ] Sistema de categorías más robusto
- [ ] Filtros de fecha en reportes
- [ ] Paginación en tablas

## 📝 Notas

- Los datos se guardan en archivos JSON en `data/`
- Cada reinicio del servidor no afecta los datos (persistencia en archivos)
- La contraseña por defecto para nuevos vendedores es `cafe2024`
- El token JWT expira en 24 horas
- El sistema es responsivo y funciona en dispositivos móviles

## ✅ Checklist de Funcionalidades

- ✅ Catálogo público sin login
- ✅ Sistema de autenticación con roles
- ✅ Panel de vendedor (vender + reporte)
- ✅ Panel de administrador (vendedores + productos + reportes)
- ✅ CRUD de vendedores
- ✅ CRUD de productos
- ✅ Historial de ventas
- ✅ Reportes de ventas
- ✅ Control de inventario
- ✅ Interfaz responsiva
- ✅ Sistema de seguridad con JWT

## 🤝 Soporte

Para cualquier pregunta o problema, revisa los archivos de error en el navegador (F12) o en la consola de Node.js.
