import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import "./Comunidad.css";

const API_URL = "http://localhost:3000/api";

// código de retiro aleatorio de 6 caracteres
function generarCodigo() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function Comunidad() {
  const { usuario, setUsuario } = useAuth();
  const token = localStorage.getItem("bucle_token");

  const [canastas, setCanastas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [retirando, setRetirando] = useState(null);
  const [errorGeneral, setErrorGeneral] = useState("");

  // Modal de confirmación de retiro
  const [modalRetiro, setModalRetiro] = useState(null);

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

  //muestra el modal con datos del dueño y código
  const iniciarRetiro = (canasta) => {
    if (!usuario) {
      setErrorGeneral("Tenés que iniciar sesión para retirar una canasta.");
      return;
    }
    const codigo = generarCodigo();
    setModalRetiro({ canasta, codigo });
  };

  // Confirmar retiro real
  const confirmarRetiro = async () => {
    if (!modalRetiro) return;
    const { canasta } = modalRetiro;

    setRetirando(canasta.id);
    try {
      const res = await fetch(`${API_URL}/canastas/${canasta.id}/retirar`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const data = await res.json();
        setErrorGeneral(data.error || "No se pudo retirar la canasta.");
        setModalRetiro(null);
        return;
      }

      const actualizada = await res.json();
      setCanastas(canastas.map((c) => (c.id === canasta.id ? actualizada : c)));

      // refrescamos bucles del usuario
      const resU = await fetch(`${API_URL}/usuarios/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (resU.ok) {
        const du = await resU.json();
        setUsuario((prev) => ({ ...prev, ...du }));
      }

      setModalRetiro(null);
    } catch (err) {
      console.error(err);
      setErrorGeneral("Error de conexión al retirar la canasta.");
      setModalRetiro(null);
    } finally {
      setRetirando(null);
    }
  };

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
                  onClick={() => iniciarRetiro(c)}
                  disabled={retirando === c.id}
                >
                  {retirando === c.id ? "Retirando..." : "Quiero retirarla"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalRetiro && (
        <div className="vol-modal-overlay" onClick={() => setModalRetiro(null)}>
          <div
            className="vol-modal retiro-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="vol-modal-header">
              <h2>📦 Retirar canasta</h2>
              <button
                className="vol-close-btn"
                onClick={() => setModalRetiro(null)}
              >
                ✕
              </button>
            </div>

            <div className="retiro-info">
              <p className="retiro-subtitulo">
                Para coordinar el retiro, contactá a:
              </p>

              <div className="retiro-contacto">
                <div className="retiro-dato">
                  <span className="retiro-label">👤 </span>
                  <span className="retiro-valor">
                    {modalRetiro.canasta.usuario?.nombre || "—"}
                  </span>
                </div>
                <div className="retiro-dato">
                  <span className="retiro-label">✉️ </span>
                  <span className="retiro-valor retiro-email">
                    {modalRetiro.canasta.usuario?.email || "—"}
                  </span>
                </div>
              </div>

              <div className="retiro-codigo-wrapper">
                <p className="retiro-codigo-texto">
                  Mostrá este código cuando vayas a buscarla:
                </p>
                <div className="retiro-codigo">{modalRetiro.codigo}</div>
                <p className="retiro-codigo-hint">
                  El dueño de la canasta te va a pedir este código para
                  confirmar la entrega física.
                </p>
              </div>
            </div>

            <div className="vol-modal-actions">
              <button
                className="vol-btn-cancel"
                onClick={() => setModalRetiro(null)}
              >
                Cancelar
              </button>
              <button
                className="vol-btn-confirmar"
                onClick={confirmarRetiro}
                disabled={retirando === modalRetiro.canasta.id}
              >
                {retirando === modalRetiro.canasta.id
                  ? "Confirmando..."
                  : "Confirmar retiro"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Comunidad;
