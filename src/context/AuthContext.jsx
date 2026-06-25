import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

const API_URL = "http://localhost:3000/api";

export function AuthProvider({ children }) {
  const [usuario, setUsuarioRaw] = useState(() => {
    try {
      const guardado = localStorage.getItem("bucle_usuario");
      return guardado ? JSON.parse(guardado) : null;
    } catch {
      return null;
    }
  });

  // Único punto donde se escribe el estado Y el localStorage
  const setUsuario = (valorOFuncion) => {
    setUsuarioRaw((prev) => {
      const nuevo =
        typeof valorOFuncion === "function"
          ? valorOFuncion(prev)
          : valorOFuncion;
      if (nuevo) {
        localStorage.setItem("bucle_usuario", JSON.stringify(nuevo));
      } else {
        localStorage.removeItem("bucle_usuario");
      }
      return nuevo;
    });
  };

  // (bucles actualizados, avatar guardado, etc.)
  useEffect(() => {
    const token = localStorage.getItem("bucle_token");
    if (!token) return;
    fetch(`${API_URL}/usuarios/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) setUsuario((prev) => ({ ...prev, ...data }));
      })
      .catch(() => {});
  }, []);

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
      localStorage.setItem("bucle_token", data.token);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  };

  const logout = () => {
    setUsuarioRaw(null);
    localStorage.removeItem("bucle_usuario");
    localStorage.removeItem("bucle_token");
  };

  return (
    <AuthContext.Provider
      value={{ usuario, setUsuario, login, registro, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
