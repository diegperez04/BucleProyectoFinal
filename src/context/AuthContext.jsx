import { createContext, useState } from "react";

export const AuthContext = createContext(null);

const API_URL = "http://localhost:3000/api";

export function AuthProvider({ children }) {
  // lee el usuario guardado una sola vez, al crear el estado
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem("bucle_usuario");
    return guardado ? JSON.parse(guardado) : null;
  });
  const [cargando] = useState(false);

  // cada vez que se actualiza el usuario (ej: refrescar bucles), lo persistimos también.
  // Si los datos son exactamente iguales a los que ya había, devolvemos el mismo objeto
  // anterior (sin crear uno nuevo) para que React no dispare un re-render en cadena.
  const actualizarUsuario = (valorOFuncion) => {
    setUsuario((prev) => {
      const nuevo =
        typeof valorOFuncion === "function"
          ? valorOFuncion(prev)
          : valorOFuncion;

      if (prev && nuevo && JSON.stringify(prev) === JSON.stringify(nuevo)) {
        return prev; // sin cambios reales, no generamos una nueva referencia
      }

      if (nuevo) localStorage.setItem("bucle_usuario", JSON.stringify(nuevo));
      return nuevo;
    });
  };

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
      value={{
        usuario,
        setUsuario: actualizarUsuario,
        login,
        registro,
        logout,
        cargando,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
