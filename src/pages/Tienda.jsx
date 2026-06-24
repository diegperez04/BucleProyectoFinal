import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import Card from "../components/ui/Card";
import Tierra from "../assets/Tierra.png";
import "./Tienda.css";

const API_URL = "http://localhost:3000/api";

function Tienda() {
  const { usuario, setUsuario } = useAuth();
  const token = localStorage.getItem("bucle_token");

  const [recompensas, setRecompensas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [canjeando, setCanjeando] = useState(null); // id en proceso
  const [errorGeneral, setErrorGeneral] = useState("");

  const [modalAbierto, setModalAbierto] = useState(false);
  const [publicando, setPublicando] = useState(false);
  const [errorPublicar, setErrorPublicar] = useState("");

  const [form, setForm] = useState({
    emoji: "🎁",
    titulo: "",
    categoria: "",
    descripcion: "",
    bucles: "",
    bgColor: "verde",
    ecoTag: false,
  });

  const cargarRecompensas = async () => {
    setCargando(true);
    try {
      const res = await fetch(`${API_URL}/recompensas?estado=Disponible`);
      const data = await res.json();
      setRecompensas(data);
    } catch (err) {
      console.error(err);
      setErrorGeneral(
        "No pudimos cargar la tienda. ¿Está corriendo el servidor?",
      );
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(() => {
      cargarRecompensas();
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const handleCanjear = async (recompensa) => {
    if (!usuario) {
      setErrorGeneral("Tenés que iniciar sesión para canjear.");
      return;
    }
    if ((usuario.bucles || 0) < recompensa.bucles) {
      setErrorGeneral("No tenés suficientes bucles para este canje.");
      return;
    }

    setCanjeando(recompensa.id);
    try {
      const res = await fetch(
        `${API_URL}/recompensas/${recompensa.id}/canjear`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (!res.ok) {
        const data = await res.json();
        setErrorGeneral(data.error || "No se pudo canjear.");
        return;
      }

      // la recompensa canjeada ya no se muestra en la tienda
      setRecompensas(recompensas.filter((r) => r.id !== recompensa.id));

      // refrescamos el saldo de bucles del usuario
      const resUsuario = await fetch(`${API_URL}/usuarios/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (resUsuario.ok) {
        const datosUsuario = await resUsuario.json();
        setUsuario((prev) => ({ ...prev, ...datosUsuario }));
      }
    } catch (err) {
      console.error(err);
      setErrorGeneral("Error de conexión al canjear.");
    } finally {
      setCanjeando(null);
    }
  };

  const handlePublicar = async () => {
    if (!form.titulo || !form.bucles) return;

    if (!usuario) {
      setErrorPublicar(
        "Tenés que iniciar sesión para publicar una recompensa.",
      );
      return;
    }

    setErrorPublicar("");
    setPublicando(true);
    try {
      const res = await fetch(`${API_URL}/recompensas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          emoji: form.emoji,
          titulo: form.titulo,
          categoria: form.categoria,
          descripcion: form.descripcion,
          bucles: Number(form.bucles),
          bgColor: form.bgColor,
          ecoTag: form.ecoTag,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrorPublicar(data.error || "No se pudo publicar la recompensa.");
        return;
      }

      const nueva = await res.json();
      setRecompensas([nueva, ...recompensas]);
      setForm({
        emoji: "🎁",
        titulo: "",
        categoria: "",
        descripcion: "",
        bucles: "",
        bgColor: "verde",
        ecoTag: false,
      });
      setModalAbierto(false);
    } catch (err) {
      console.error(err);
      setErrorPublicar("Error de conexión al publicar.");
    } finally {
      setPublicando(false);
    }
  };

  return (
    <div>
      <div className="tienda-hero">
        <div className="tienda-hero-texto">
          <p className="tienda-eyebrow">Tienda virtual</p>
          <h1>
            Aprovechá los beneficios
            <br />
            por hacer un mundo mejor
          </h1>
          <p className="tienda-subtitulo">
            Canjeá tus bucles por productos y descuentos reales.
          </p>
        </div>
        <div className="tienda-hero-img">
          <img src={Tierra} alt="Tierra" />
        </div>
      </div>

      {errorGeneral && (
        <div className="vol-error-banner" style={{ margin: "1rem 2.5rem 0" }}>
          {errorGeneral}
          <button onClick={() => setErrorGeneral("")}>✕</button>
        </div>
      )}

      <div className="tienda-seccion">
        <div className="tienda-seccion-header">
          <h2 className="tienda-seccion-titulo">Recompensas disponibles</h2>
          <button
            className="btn-nueva-recompensa"
            onClick={() => setModalAbierto(true)}
          >
            + Publicar recompensa
          </button>
        </div>

        {cargando && <p className="vol-cargando">Cargando tienda...</p>}

        {!cargando && recompensas.length === 0 && (
          <p className="vol-cargando">Todavía no hay recompensas publicadas.</p>
        )}

        <div className="tienda-grid">
          {recompensas.map((r) => (
            <Card
              key={r.id}
              type="producto"
              emoji={r.emoji}
              title={r.titulo}
              category={r.categoria}
              bucles={r.bucles}
              bgColor={r.bgColor}
              ecoTag={r.ecoTag}
              onCanjear={() => handleCanjear(r)}
              canjeando={canjeando === r.id}
            />
          ))}
        </div>
      </div>

      {modalAbierto && (
        <div
          className="vol-modal-overlay"
          onClick={() => setModalAbierto(false)}
        >
          <div className="vol-modal" onClick={(e) => e.stopPropagation()}>
            <div className="vol-modal-header">
              <h2>Publicar recompensa</h2>
              <button
                className="vol-close-btn"
                onClick={() => setModalAbierto(false)}
              >
                ✕
              </button>
            </div>

            {!usuario && (
              <p className="vol-form-error">
                Necesitás iniciar sesión para publicar.
              </p>
            )}

            <div className="vol-form">
              <div className="vol-form-fila">
                <div className="vol-form-grupo">
                  <label>Emoji</label>
                  <select
                    value={form.emoji}
                    onChange={(e) =>
                      setForm({ ...form, emoji: e.target.value })
                    }
                  >
                    <option>🎁</option>
                    <option>🛒</option>
                    <option>🧴</option>
                    <option>☕</option>
                    <option>🛍️</option>
                    <option>💧</option>
                    <option>🌱</option>
                  </select>
                </div>
                <div className="vol-form-grupo" style={{ flex: 1 }}>
                  <label>Nombre *</label>
                  <input
                    type="text"
                    placeholder="Ej: Cupón 20% off en compras"
                    value={form.titulo}
                    onChange={(e) =>
                      setForm({ ...form, titulo: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="vol-form-grupo">
                <label>Categoría</label>
                <input
                  type="text"
                  placeholder="Ej: Supermercado"
                  value={form.categoria}
                  onChange={(e) =>
                    setForm({ ...form, categoria: e.target.value })
                  }
                />
              </div>

              <div className="vol-form-grupo">
                <label>Descripción</label>
                <textarea
                  placeholder="Contá de qué se trata..."
                  value={form.descripcion}
                  onChange={(e) =>
                    setForm({ ...form, descripcion: e.target.value })
                  }
                />
              </div>

              <div className="vol-form-fila">
                <div className="vol-form-grupo">
                  <label>Bucles que cuesta *</label>
                  <input
                    type="number"
                    placeholder="Ej: 200"
                    value={form.bucles}
                    onChange={(e) =>
                      setForm({ ...form, bucles: e.target.value })
                    }
                  />
                </div>
                <div className="vol-form-grupo">
                  <label>Color de fondo</label>
                  <select
                    value={form.bgColor}
                    onChange={(e) =>
                      setForm({ ...form, bgColor: e.target.value })
                    }
                  >
                    <option value="verde">Verde</option>
                    <option value="marron">Marrón</option>
                    <option value="mix">Mix</option>
                  </select>
                </div>
                <div
                  className="vol-form-grupo"
                  style={{ justifyContent: "center" }}
                >
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      marginTop: "8px",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={form.ecoTag}
                      onChange={(e) =>
                        setForm({ ...form, ecoTag: e.target.checked })
                      }
                      style={{ width: "auto" }}
                    />
                    Eco
                  </label>
                </div>
              </div>

              {errorPublicar && (
                <p className="vol-form-error">{errorPublicar}</p>
              )}
            </div>

            <div className="vol-modal-actions">
              <button
                className="vol-btn-cancel"
                onClick={() => setModalAbierto(false)}
              >
                Cancelar
              </button>
              <button
                className="vol-btn-confirmar"
                onClick={handlePublicar}
                disabled={
                  !form.titulo || !form.bucles || publicando || !usuario
                }
              >
                {publicando ? "Publicando..." : "Publicar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tienda;
