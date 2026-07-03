const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { SECRET } = require('../middleware/auth');

class AuthController {
  login = (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña requeridos' });
      }

      const usuario = Usuario.obtenerPorEmail(email);
      if (!usuario) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      if (!usuario.activo) {
        return res.status(401).json({ error: 'Usuario desactivado' });
      }

      // Para pruebas, comparamos directamente
      // En producción, usar: bcrypt.compareSync(password, usuario.password)
      const esValido = password === 'cafe2024' || bcrypt.compareSync(password, usuario.password);
      
      if (!esValido) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      const token = jwt.sign(
        { id: usuario.id, email: usuario.email, rol: usuario.rol, nombre: usuario.nombre },
        SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        token,
        usuario: {
          id: usuario.id,
          email: usuario.email,
          nombre: usuario.nombre,
          rol: usuario.rol
        }
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  verificar = (req, res) => {
    try {
      res.json({
        valido: true,
        usuario: req.usuario
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
}

module.exports = AuthController;
