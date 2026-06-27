import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/useAuth";
import "./MiPerfil.css";

const API_URL = "http://localhost:3000/api";

function formatearFecha(fecha) {
  return new Date(fecha).toLocaleDateString("es-UY", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function MiPerfil({ onNecesitaLogin }) {
  const { usuario, setUsuario, logout } = useAuth();
  const token = localStorage.getItem("bucle_token");
  const usuarioId = usuario?.id;

  const [tab, setTab] = useState("datos");

  const [historial, setHistorial] = useState([]);
  const [cargandoHistorial, setCargandoHistorial] = useState(true);

  const [canastas, setCanastas] = useState([]);
  const [cargandoCanastas, setCargandoCanastas] = useState(true);

  const [modalCanastaAbierto, setModalCanastaAbierto] = useState(false);
  const [creandoCanasta, setCreandoCanasta] = useState(false);
  const [errorCanasta, setErrorCanasta] = useState("");

  const [selectorAvatarAbierto, setSelectorAvatarAbierto] = useState(false);
  const opcionesAvatar = [
    "🙂",
    "🌱",
    "🌳",
    "♻️",
    "🌍",
    "🐢",
    "🦊",
    "🐸",
    "🌻",
    "🍃",
  ];

  const [form, setForm] = useState({
    descripcion: "",
    ubicacion: "",
    cantidad: "",
    emoji: "🗑️",
  });

  const cargarHistorial = useCallback(async () => {
    setCargandoHistorial(true);
    try {
      const res = await fetch(`${API_URL}/voluntariados/mis-anotaciones`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setHistorial(data);
    } catch (err) {
      console.error(err);
    } finally {
      setCargandoHistorial(false);
    }
  }, [token]);

  const cargarMisCanastas = useCallback(async () => {
    setCargandoCanastas(true);
    try {
      const res = await fetch(`${API_URL}/canastas?usuarioId=${usuarioId}`);
      const data = await res.json();
      setCanastas(data);
    } catch (err) {
      console.error(err);
    } finally {
      setCargandoCanastas(false);
    }
  }, [usuarioId]);

  useEffect(() => {
    if (!usuarioId) return;
    cargarHistorial();
    cargarMisCanastas();
  }, [usuarioId, cargarHistorial, cargarMisCanastas]);

  const handleCambiarAvatar = async (emoji) => {
    setSelectorAvatarAbierto(false);

    setUsuario((prev) => ({ ...prev, avatar: emoji }));

    try {
      const res = await fetch(`${API_URL}/usuarios/me/avatar`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ avatar: emoji }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        console.error("No se pudo guardar el avatar:", data.error);
        setErrorCanasta(data.error || "No se pudo guardar el avatar.");
        return;
      }

      const data = await res.json();

      setUsuario((prev) => ({ ...prev, ...data }));
    } catch (err) {
      console.error(err);
      setErrorCanasta("Error de conexión al cambiar el avatar.");
    }
  };

  const handleCrearCanasta = async () => {
    if (!form.descripcion || !form.ubicacion || !form.cantidad) return;

    setErrorCanasta("");
    setCreandoCanasta(true);
    try {
      const res = await fetch(`${API_URL}/canastas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          foto: form.emoji,
          descripcion: form.descripcion,
          ubicacion: form.ubicacion,
          cantidad: form.cantidad,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrorCanasta(data.error || "No se pudo crear la canasta.");
        return;
      }

      const nueva = await res.json();
      setCanastas([nueva, ...canastas]);
      setForm({ descripcion: "", ubicacion: "", cantidad: "", emoji: "🗑️" });
      setModalCanastaAbierto(false);
    } catch (err) {
      console.error(err);
      setErrorCanasta("Error de conexión al crear la canasta.");
    } finally {
      setCreandoCanasta(false);
    }
  };

  if (!usuario) {
    return (
      <div className="perfil-wrapper">
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <p style={{ marginBottom: "1rem" }}>
            Necesitás iniciar sesión para ver tu perfil.
          </p>
          <button className="btn-nuevo" onClick={onNecesitaLogin}>
            Ir a iniciar sesión
          </button>
        </div>
      </div>
    );
  }

  const buclesActuales = usuario.bucles || 0;
  const completados = historial.filter((h) => h.estado === "Completado").length;

  return (
    <div className="perfil-wrapper">
      <div className="perfil-header">
        <div className="perfil-avatar-wrapper">
          <button
            className="perfil-avatar perfil-avatar-btn"
            onClick={() => setSelectorAvatarAbierto(!selectorAvatarAbierto)}
            title="Cambiar foto de perfil"
          >
            {usuario?.avatar || "🙂"}
          </button>

          {selectorAvatarAbierto && (
            <div className="avatar-selector">
              {opcionesAvatar.map((emoji) => (
                <button
                  key={emoji}
                  className="avatar-opcion"
                  onClick={() => handleCambiarAvatar(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="perfil-info">
          <h1>{usuario?.nombre}</h1>
          <p>{usuario?.email}</p>
        </div>
        <div className="perfil-bucles">
          <span className="perfil-bucles-num">{buclesActuales}</span>
          <span className="perfil-bucles-label">bucles acumulados</span>
        </div>
        <button className="perfil-logout" onClick={logout}>
          Cerrar sesión
        </button>
      </div>

      <div className="perfil-tabs">
        <button
          className={tab === "datos" ? "perfil-tab activo" : "perfil-tab"}
          onClick={() => setTab("datos")}
        >
          Mis datos
        </button>
        <button
          className={
            tab === "voluntariados" ? "perfil-tab activo" : "perfil-tab"
          }
          onClick={() => setTab("voluntariados")}
        >
          Mis voluntariados
        </button>
        <button
          className={tab === "canastas" ? "perfil-tab activo" : "perfil-tab"}
          onClick={() => setTab("canastas")}
        >
          Mis canastas
        </button>
      </div>

      <div className="perfil-contenido">
        {tab === "datos" && (
          <div className="perfil-datos">
            <div className="dato-fila">
              <span className="dato-label">Nombre</span>
              <span className="dato-valor">{usuario?.nombre}</span>
            </div>
            <div className="dato-fila">
              <span className="dato-label">Email</span>
              <span className="dato-valor">{usuario?.email}</span>
            </div>
            <div className="dato-fila">
              <span className="dato-label">Bucles totales</span>
              <span className="dato-valor">{buclesActuales}</span>
            </div>
            <div className="dato-fila">
              <span className="dato-label">Voluntariados completados</span>
              <span className="dato-valor">{completados}</span>
            </div>
          </div>
        )}

        {tab === "voluntariados" && (
          <div className="historial-lista">
            {cargandoHistorial && (
              <p className="vol-cargando">Cargando historial...</p>
            )}

            {!cargandoHistorial && historial.length === 0 && (
              <p className="vol-cargando">
                Todavía no te anotaste a ningún voluntariado.
              </p>
            )}

            {historial.map((h) => (
              <div key={h.id} className="historial-item">
                <div className="historial-info">
                  <h4>{h.voluntariado?.titulo}</h4>
                  <span className="historial-fecha">
                    {formatearFecha(h.voluntariado?.fecha)}
                  </span>
                </div>
                <span
                  className={`historial-estado ${h.estado === "Completado" ? "completado" : "pendiente"}`}
                >
                  {h.estado}
                </span>
                <span className="historial-bucles">
                  +{h.voluntariado?.bucles} bucles
                </span>
              </div>
            ))}
          </div>
        )}

        {tab === "canastas" && (
          <div>
            <div className="canastas-header">
              <h3>Tus canastas de reciclaje</h3>
              <button
                className="btn-nueva-canasta"
                onClick={() => setModalCanastaAbierto(true)}
              >
                + Crear canasta
              </button>
            </div>

            {cargandoCanastas && (
              <p className="vol-cargando">Cargando canastas...</p>
            )}

            {!cargandoCanastas && canastas.length === 0 && (
              <p className="vol-cargando">
                Todavía no creaste ninguna canasta.
              </p>
            )}

            <div className="canastas-grid">
              {canastas.map((c) => (
                <div key={c.id} className="canasta-card">
                  <div className="canasta-img">
                    <span>{c.foto || "🗑️"}</span>
                    <span
                      className={`canasta-estado ${c.estado === "Disponible" ? "disponible" : "retirada"}`}
                    >
                      {c.estado}
                    </span>
                  </div>
                  <div className="canasta-body">
                    <p className="canasta-descripcion">{c.descripcion}</p>
                    <span className="canasta-ubicacion">📍 {c.ubicacion}</span>
                    <span className="canasta-cantidad">{c.cantidad}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {modalCanastaAbierto && (
        <div
          className="perfil-modal-overlay"
          onClick={() => setModalCanastaAbierto(false)}
        >
          <div className="perfil-modal" onClick={(e) => e.stopPropagation()}>
            <div className="perfil-modal-header">
              <h2>Crear canasta de reciclaje</h2>
              <button
                className="perfil-close-btn"
                onClick={() => setModalCanastaAbierto(false)}
              >
                ✕
              </button>
            </div>

            <div className="perfil-form">
              <div className="perfil-form-grupo">
                <label>Ícono</label>
                <select
                  value={form.emoji}
                  onChange={(e) => setForm({ ...form, emoji: e.target.value })}
                  style={{ width: "100px" }}
                >
                  <option>🗑️</option>
                  <option>🧃</option>
                  <option>📦</option>
                  <option>🍶</option>
                  <option>👕</option>
                  <option>🔋</option>
                </select>
              </div>

              <div className="perfil-form-grupo">
                <label>Descripción *</label>
                <textarea
                  placeholder="Ej: Botellas de plástico y envases limpios"
                  value={form.descripcion}
                  onChange={(e) =>
                    setForm({ ...form, descripcion: e.target.value })
                  }
                />
              </div>

              <div className="perfil-form-fila">
                <div className="perfil-form-grupo">
                  <label>Ubicación *</label>
                  <input
                    type="text"
                    placeholder="Ej: Cordón, Montevideo"
                    value={form.ubicacion}
                    onChange={(e) =>
                      setForm({ ...form, ubicacion: e.target.value })
                    }
                  />
                </div>
                <div className="perfil-form-grupo">
                  <label>Cantidad aprox. *</label>
                  <input
                    type="text"
                    placeholder="Ej: 5 kg"
                    value={form.cantidad}
                    onChange={(e) =>
                      setForm({ ...form, cantidad: e.target.value })
                    }
                  />
                </div>
              </div>

              {errorCanasta && <p className="vol-form-error">{errorCanasta}</p>}
            </div>

            <div className="perfil-modal-actions">
              <button
                className="perfil-btn-cancel"
                onClick={() => setModalCanastaAbierto(false)}
              >
                Cancelar
              </button>
              <button
                className="perfil-btn-confirmar"
                onClick={handleCrearCanasta}
                disabled={
                  !form.descripcion ||
                  !form.ubicacion ||
                  !form.cantidad ||
                  creandoCanasta
                }
              >
                {creandoCanasta ? "Publicando..." : "Publicar canasta"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default MiPerfil;
