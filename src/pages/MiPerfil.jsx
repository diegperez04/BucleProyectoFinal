import { useState } from "react";
import { useAuth } from "../controlers/AuthContext";

import "./MiPerfil.css";

// esto lo cambiamos cuando tengamos el json
const historialEjemplo = [
  {
    id: 1,
    title: "Limpieza en Parque Rodó",
    date: "2026-04-12",
    bucles: 80,
    estado: "Completado",
  },
  {
    id: 2,
    title: "Punto verde en La Feria",
    date: "2026-04-28",
    bucles: 60,
    estado: "Completado",
  },
  {
    id: 3,
    title: "Taller de reciclaje escolar",
    date: "2026-06-05",
    bucles: 100,
    estado: "Anotado",
  },
];

const canastasEjemplo = [
  {
    id: 1,
    foto: "🧃",
    descripcion: "Botellas de plástico y envases limpios",
    ubicacion: "Cordón, Montevideo",
    cantidad: "5 kg aprox.",
    estado: "Disponible",
  },
  {
    id: 2,
    foto: "📦",
    descripcion: "Cajas de cartón y diarios viejos",
    ubicacion: "Cordón, Montevideo",
    cantidad: "3 kg aprox.",
    estado: "Retirada",
  },
];
function MiPerfil() {
  const { usuario, logout } = useAuth();
  const [tab, setTab] = useState("datos");
  const [modalCanastaAbierto, setModalCanastaAbierto] = useState(false);
  const [canastas, setCanastas] = useState(canastasEjemplo);

  const [form, setForm] = useState({
    descripcion: "",
    ubicacion: "",
    cantidad: "",
    foto: null,
    fotoPreview: null,
  });

  const totalBucles = historialEjemplo
    .filter((h) => h.estado === "Completado")
    .reduce((acc, h) => acc + h.bucles, 0);

  const handleFoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm({ ...form, foto: file, fotoPreview: URL.createObjectURL(file) });
  };

  const handleCrearCanasta = () => {
    if (!form.descripcion || !form.ubicacion || !form.cantidad) return;

    const nueva = {
      id: Date.now(),
      foto: form.fotoPreview || "🗑️",
      descripcion: form.descripcion,
      ubicacion: form.ubicacion,
      cantidad: form.cantidad,
      estado: "Disponible",
    };

    setCanastas([nueva, ...canastas]);
    setForm({
      descripcion: "",
      ubicacion: "",
      cantidad: "",
      foto: null,
      fotoPreview: null,
    });
    setModalCanastaAbierto(false);

    // Cambiar para le back
    // const formData = new FormData();
    // formData.append("descripcion", form.descripcion);
    // formData.append("ubicacion", form.ubicacion);
    // formData.append("cantidad", form.cantidad);
    // formData.append("foto", form.foto);
    // fetch(`${API_URL}/canastas`, { method: "POST", body: formData });
  };

  return (
    <div className="perfil-wrapper">
      <div className="perfil-header">
        <div className="perfil-avatar">
          {usuario?.nombre?.[0]?.toUpperCase() || "U"}
        </div>
        <div className="perfil-info">
          <h1>{usuario?.nombre || "Usuario"}</h1>
          <p>{usuario?.email || "usuario@email.com"}</p>
        </div>
        <div className="perfil-bucles">
          <span className="perfil-bucles-num">{totalBucles}</span>
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
              <span className="dato-valor">{usuario?.nombre || "—"}</span>
            </div>
            <div className="dato-fila">
              <span className="dato-label">Email</span>
              <span className="dato-valor">{usuario?.email || "—"}</span>
            </div>
            <div className="dato-fila">
              <span className="dato-label">Bucles totales</span>
              <span className="dato-valor">{totalBucles}</span>
            </div>
            <div className="dato-fila">
              <span className="dato-label">Voluntariados completados</span>
              <span className="dato-valor">
                {
                  historialEjemplo.filter((h) => h.estado === "Completado")
                    .length
                }
              </span>
            </div>
          </div>
        )}

        {tab === "voluntariados" && (
          <div className="historial-lista">
            {historialEjemplo.map((h) => (
              <div key={h.id} className="historial-item">
                <div className="historial-info">
                  <h4>{h.title}</h4>
                  <span className="historial-fecha">
                    {new Date(h.date + "T00:00:00").toLocaleDateString(
                      "es-UY",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      },
                    )}
                  </span>
                </div>
                <span
                  className={`historial-estado ${h.estado === "Completado" ? "completado" : "pendiente"}`}
                >
                  {h.estado}
                </span>
                <span className="historial-bucles">+{h.bucles} bucles</span>
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

            <div className="canastas-grid">
              {canastas.map((c) => (
                <div key={c.id} className="canasta-card">
                  <div className="canasta-img">
                    {c.foto.startsWith?.("blob:") ||
                    c.foto.startsWith?.("http") ? (
                      <img src={c.foto} alt="Canasta" />
                    ) : (
                      <span>{c.foto}</span>
                    )}
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
                <label>Foto</label>
                <label className="foto-upload">
                  {form.fotoPreview ? (
                    <img
                      src={form.fotoPreview}
                      alt="Preview"
                      className="foto-preview"
                    />
                  ) : (
                    <span className="foto-placeholder">📷 Subir foto</span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFoto}
                    hidden
                  />
                </label>
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
                  !form.descripcion || !form.ubicacion || !form.cantidad
                }
              >
                Publicar canasta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default MiPerfil;
