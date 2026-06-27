import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import Card from "../components/ui/Card";
import Cart from "../components/ui/Cart";
import Tierra from "../assets/Tierra.png";
import "./Tienda.css";

const API_URL = "http://localhost:3000/api";

const RECOMPENSAS_EJEMPLO = [
  {
    id: "ej-1",
    emoji: "💧",
    titulo: "Botella Ecológica",
    categoria: "Productos sustentables",
    descripcion: "Botella reutilizable de acero inoxidable 500ml.",
    bucles: 300,
    bgColor: "verde",
    ecoTag: true,
    esEjemplo: true,
  },
  {
    id: "ej-2",
    emoji: "🛍️",
    titulo: "Tote Bag",
    categoria: "Accesorios",
    descripcion: "Bolsa de tela reutilizable, resistente y lavable.",
    bucles: 280,
    bgColor: "marron",
    ecoTag: false,
    esEjemplo: true,
  },
  {
    id: "ej-3",
    emoji: "🛒",
    titulo: "Cupón 20% off en supermercado",
    categoria: "Supermercado",
    descripcion: "Descuento válido en cualquier compra de más de $500.",
    bucles: 200,
    bgColor: "verde",
    ecoTag: true,
    esEjemplo: true,
  },
  {
    id: "ej-4",
    emoji: "🧴",
    titulo: "Kit limpieza ecológica",
    categoria: "Hogar",
    descripcion: "Productos de limpieza biodegradables para el hogar.",
    bucles: 150,
    bgColor: "mix",
    ecoTag: false,
    esEjemplo: true,
  },
  {
    id: "ej-5",
    emoji: "☕",
    titulo: "Café gratis en Café Verde",
    categoria: "Gastronomía",
    descripcion: "Un café de especialidad para vos.",
    bucles: 120,
    bgColor: "marron",
    ecoTag: true,
    esEjemplo: true,
  },
  {
    id: "ej-6",
    emoji: "🌱",
    titulo: "Plántula de árbol nativo",
    categoria: "Naturaleza",
    descripcion: "Una plántula de árbol nativo uruguayo para plantar en casa.",
    bucles: 80,
    bgColor: "verde",
    ecoTag: true,
    esEjemplo: true,
  },
];

function Tienda() {
  const { usuario, setUsuario } = useAuth();
  const token = localStorage.getItem("bucle_token");

  const [recompensas, setRecompensas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorGeneral, setErrorGeneral] = useState("");

  //carrito
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [canjeandoCarrito, setCanjeandoCarrito] = useState(false);

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
    const t = setTimeout(cargarRecompensas, 0);
    return () => clearTimeout(t);
  }, []);

  const agregarAlCarrito = (item) => {
    if (carrito.find((c) => c.id === item.id)) return;
    setCarrito((prev) => [...prev, item]);
    setMostrarCarrito(true);
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((c) => c.id !== id));
  };

  const realizarCanje = async () => {
    if (carrito.length === 0 || !usuario) return;

    const itemsReales = carrito.filter((c) => !c.esEjemplo);
    const itemsEjemplo = carrito.filter((c) => c.esEjemplo);

    setCanjeandoCarrito(true);
    try {
      for (const item of itemsReales) {
        const res = await fetch(`${API_URL}/recompensas/${item.id}/canjear`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          const data = await res.json();
          setErrorGeneral(data.error || "Error al canjear.");
          return;
        }
      }

      if (itemsEjemplo.length > 0) {
        const totalEjemplo = itemsEjemplo.reduce((acc, c) => acc + c.bucles, 0);
        setUsuario((prev) => ({
          ...prev,
          bucles: (prev?.bucles || 0) - totalEjemplo,
        }));
      }

      if (itemsReales.length > 0) {
        setRecompensas((prev) =>
          prev.filter((r) => !itemsReales.find((i) => i.id === r.id)),
        );
      }

      // refrescamos bucles desde el servidor
      const resU = await fetch(`${API_URL}/usuarios/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (resU.ok) {
        const du = await resU.json();
        setUsuario((prev) => ({ ...prev, ...du }));
      }

      setCarrito([]);
      setMostrarCarrito(false);
      alert("¡Canje realizado con éxito! 🎉");
    } catch (err) {
      console.error(err);
      setErrorGeneral("Error de conexión al canjear.");
    } finally {
      setCanjeandoCarrito(false);
    }
  };

  const handlePublicar = async () => {
    if (!form.titulo || !form.bucles || !usuario) return;
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
        setErrorPublicar(data.error || "No se pudo publicar.");
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

  const todasLasRecompensas =
    recompensas.length > 0 ? recompensas : RECOMPENSAS_EJEMPLO;

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
          <div
            style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}
          >
            <button
              className="btn-carrito"
              onClick={() => setMostrarCarrito(true)}
            >
              🛒 Carrito ({carrito.length})
            </button>
            <button
              className="btn-nueva-recompensa"
              onClick={() => setModalAbierto(true)}
            >
              + Publicar recompensa
            </button>
          </div>
        </div>

        {cargando && <p className="vol-cargando">Cargando tienda...</p>}

        <div className="tienda-grid">
          {todasLasRecompensas.map((r) => (
            <Card
              key={r.id}
              type="producto"
              emoji={r.emoji}
              title={r.titulo}
              category={r.categoria}
              bucles={r.bucles}
              bgColor={r.bgColor}
              ecoTag={r.ecoTag}
              enCarrito={!!carrito.find((c) => c.id === r.id)}
              onCanjear={() => agregarAlCarrito(r)}
            />
          ))}
        </div>
      </div>

      {mostrarCarrito && (
        <Cart
          carrito={carrito}
          onEliminar={eliminarDelCarrito}
          onCerrar={() => setMostrarCarrito(false)}
          onCanjear={realizarCanje}
          canjeando={canjeandoCarrito}
        />
      )}

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
