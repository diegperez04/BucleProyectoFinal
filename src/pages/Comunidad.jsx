import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import "./Comunidad.css";

const API_URL = "http://localhost:3000/api";

function Comunidad() {
  const { usuario, setUsuario } = useAuth();
  const token = localStorage.getItem("bucle_token");

  const [canastas, setCanastas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [retirando, setRetirando] = useState(null); // id de la canasta en proceso
  const [errorGeneral, setErrorGeneral] = useState("");

  const cargarCanastas = async () => {
    setCargando(true);
    try {
      const res = await fetch(`${API_URL}/canastas?estado=Disponible`);
      const data = await res.json();
      setCanastas(data);
    } catch (err) {
      console.error(err);
      setErrorGeneral(
        "No pudimos cargar las canastas. ¿Está corriendo el servidor?",
      );
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(() => {
      cargarCanastas();
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const handleRetirar = async (id) => {
    if (!usuario) {
      setErrorGeneral("Tenés que iniciar sesión para retirar una canasta.");
      return;
    }

    setRetirando(id);
    try {
      const res = await fetch(`${API_URL}/canastas/${id}/retirar`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const data = await res.json();
        setErrorGeneral(data.error || "No se pudo retirar la canasta.");
        return;
      }

      const actualizada = await res.json();
      setCanastas(canastas.map((c) => (c.id === id ? actualizada : c)));

      // refrescamos los bucles del usuario, ya que retirar suma bucles
      const resUsuario = await fetch(`${API_URL}/usuarios/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (resUsuario.ok) {
        const datosUsuario = await resUsuario.json();
        setUsuario((prev) => ({ ...prev, ...datosUsuario }));
      }
    } catch (err) {
      console.error(err);
      setErrorGeneral("Error de conexión al retirar la canasta.");
    } finally {
      setRetirando(null);
    }
  };

  // solo se ven las que siguen disponibles (las recién retiradas se filtran)
  const canastasVisibles = canastas.filter((c) => c.estado === "Disponible");

  return (
    <div>
      <div className="comunidad-hero">
        <p className="comunidad-eyebrow">Comunidad</p>
        <h1>Canastas disponibles para recoger</h1>
        <p>
          Otros usuarios de Bucle están compartiendo materiales reciclables
          cerca de tu zona. Pasá a buscarlos y ganá bucles.
        </p>
      </div>

      {errorGeneral && (
        <div className="vol-error-banner" style={{ margin: "1rem 2.5rem 0" }}>
          {errorGeneral}
          <button onClick={() => setErrorGeneral("")}>✕</button>
        </div>
      )}

      {/* Grid de canastas */}
      <div className="comunidad-seccion">
        {cargando && <p className="vol-cargando">Cargando canastas...</p>}

        {!cargando && canastasVisibles.length === 0 && (
          <p className="vol-cargando">No hay canastas disponibles por ahora.</p>
        )}

        <div className="comunidad-grid">
          {canastasVisibles.map((c) => (
            <div key={c.id} className="comunidad-card">
              <div className="comunidad-img">
                <span>{c.foto || "🗑️"}</span>
                <span className="comunidad-bucles-tag">+{c.bucles} bucles</span>
              </div>
              <div className="comunidad-body">
                <p className="comunidad-usuario">
                  👤 {c.usuario?.nombre || "Usuario"}
                </p>
                <p className="comunidad-descripcion">{c.descripcion}</p>
                <div className="comunidad-meta">
                  <span>📍 {c.ubicacion}</span>
                  <span>{c.cantidad}</span>
                </div>
                <button
                  className="btn-retirar"
                  onClick={() => handleRetirar(c.id)}
                  disabled={retirando === c.id}
                >
                  {retirando === c.id ? "Retirando..." : "Quiero retirarla"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Comunidad;
