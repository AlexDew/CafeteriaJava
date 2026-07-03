const fs = require('fs');
const path = require('path');

class Usuario {
  static ruta = path.join(__dirname, '../data/usuarios.json');

  static obtenerTodos() {
    const datos = fs.readFileSync(this.ruta, 'utf8');
    return JSON.parse(datos);
  }

  static obtenerPorId(id) {
    const usuarios = this.obtenerTodos();
    return usuarios.find(u => u.id === id);
  }

  static obtenerPorEmail(email) {
    const usuarios = this.obtenerTodos();
    return usuarios.find(u => u.email === email);
  }

  static guardar(usuarios) {
    fs.writeFileSync(this.ruta, JSON.stringify(usuarios, null, 2));
  }

  static crear(nuevoUsuario) {
    const usuarios = this.obtenerTodos();
    const id = Math.max(...usuarios.map(u => u.id), 0) + 1;
    const usuario = { id, ...nuevoUsuario, activo: true };
    usuarios.push(usuario);
    this.guardar(usuarios);
    return usuario;
  }

  static actualizar(id, datos) {
    const usuarios = this.obtenerTodos();
    const index = usuarios.findIndex(u => u.id === id);
    if (index === -1) throw new Error('Usuario no encontrado');
    usuarios[index] = { ...usuarios[index], ...datos };
    this.guardar(usuarios);
    return usuarios[index];
  }

  static eliminar(id) {
    const usuarios = this.obtenerTodos();
    const index = usuarios.findIndex(u => u.id === id);
    if (index === -1) throw new Error('Usuario no encontrado');
    usuarios.splice(index, 1);
    this.guardar(usuarios);
  }
}

module.exports = Usuario;
