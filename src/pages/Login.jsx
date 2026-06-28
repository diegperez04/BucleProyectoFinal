import { useState } from "react";
import { useAuth } from "../context/useAuth";
import "./Login.css";
import logoBucle from "../assets/BUCLE-02-02.jpg";
function Login({ onIngreso }) {
  const { login, registro } = useAuth();
  const [modo, setModo] = useState("login");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    const resultado =
      modo === "login"
        ? await login(form.email, form.password)
        : await registro(form.nombre, form.email, form.password);

    setCargando(false);

    if (resultado.ok) {
      onIngreso?.();
    } else {
      setError(resultado.error || "Algo salió mal, intentá de nuevo.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-logo">
          <img src={logoBucle} alt="Bucle" className="login-logo-img" />
          <span className="login-brand"></span>
        </div>

        <div className="login-tabs">
          <button
            className={modo === "login" ? "login-tab activo" : "login-tab"}
            onClick={() => setModo("login")}
          >
            Ingresar
          </button>
          <button
            className={modo === "registro" ? "login-tab activo" : "login-tab"}
            onClick={() => setModo("registro")}
          >
            Registrarse
          </button>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {modo === "registro" && (
            <div className="login-grupo">
              <label>Nombre</label>
              <input
                type="text"
                placeholder="Tu nombre"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                required
              />
            </div>
          )}

          <div className="login-grupo">
            <label>Email</label>
            <input
              type="email"
              placeholder="tu@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="login-grupo">
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              minLength={6}
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button className="login-btn" type="submit" disabled={cargando}>
            {cargando
              ? "Un momento..."
              : modo === "login"
                ? "Ingresar"
                : "Crear cuenta"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
