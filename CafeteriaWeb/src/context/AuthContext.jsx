import { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { login as loginAPI, verificarToken } from '../services/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [cargando, setCargando] = useState(true);

  // Verificar token al montar el componente
  useEffect(() => {
    const verificar = async () => {
      if (token) {
        try {
          const resultado = await verificarToken();
          setUsuario(resultado.usuario);
        } catch (err) {
          // Token inválido
          localStorage.removeItem('token');
          setToken(null);
          setUsuario(null);
        }
      }
      setCargando(false);
    };

    verificar();
  }, [token]);

  const login = useCallback(async (email, password) => {
    try {
      const respuesta = await loginAPI(email, password);
      localStorage.setItem('token', respuesta.token);
      setToken(respuesta.token);
      setUsuario(respuesta.usuario);
      return respuesta.usuario;
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Error al iniciar sesión');
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUsuario(null);
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, token, cargando, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error('useAuth debe estar dentro de AuthProvider');
  }
  return contexto;
}
