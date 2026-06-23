import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// Aca va a ir nuestro json cuando lo tengamos
const API_URL = "http://localhost:3000/api";

function AuthProvider({ children }) {
  //  esto lee el usuario guardado una sola vez

  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem("bucle_usuario");
    return guardado ? JSON.parse(guardado) : null;
  });
  const [cargando] = useState(false);

  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Credenciales inválidas");
      const data = await res.json();
      setUsuario(data.usuario);
      localStorage.setItem("bucle_usuario", JSON.stringify(data.usuario));
      localStorage.setItem("bucle_token", data.token);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  };

  const registro = async (nombre, email, password) => {
    try {
      const res = await fetch(`${API_URL}/auth/registro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password }),
      });
      if (!res.ok) throw new Error("No se pudo crear la cuenta");
      const data = await res.json();
      setUsuario(data.usuario);
      localStorage.setItem("bucle_usuario", JSON.stringify(data.usuario));
      localStorage.setItem("bucle_token", data.token);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("bucle_usuario");
    localStorage.removeItem("bucle_token");
  };

  return (
    <AuthContext.Provider
      value={{ usuario, setUsuario, login, registro, logout, cargando }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, AuthContext };
