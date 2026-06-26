import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useAuth } from "../context/useAuth";
import "./Voluntariado.css";

const API_URL = "http://localhost:3000/api";
// ícono personalizado para los pines del mapa
const iconoVerde = new L.Icon({
  iconUrl: "https://i.ibb.co/5WF5ND7H/ICON-2.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.6.0/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function formatearFecha(fecha) {
  const opciones = { weekday: "short", day: "numeric", month: "long" };
  return new Date(fecha).toLocaleDateString("es-UY", opciones);
}
function Voluntariado() {
  const { usuario } = useAuth();
  const token = localStorage.getItem("bucle_token");

  const [eventos, setEventos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [anotadoEn, setAnotadoEn] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState("");

  // estado del formulario
  const [form, setForm] = useState({
    emoji: "🌱",
    titulo: "",
    descripcion: "",
    fecha: "",
    hora: "",
    bucles: "",
    direccion: "",
  });

  const [buscandoDireccion, setBuscandoDireccion] = useState(false);
  const [errorDireccion, setErrorDireccion] = useState("");
  const [creando, setCreando] = useState(false);

  const cargarEventos = async () => {
    setCargando(true);
    try {
      const res = await fetch(`${API_URL}/voluntariados`);
      const data = await res.json();
      setEventos(data);
    } catch (err) {
      console.error(err);
      setErrorGeneral(
        "No pudimos cargar los voluntariados. ¿Está corriendo el servidor?",
      );
    } finally {
      setCargando(false);
    }
  };

  const cargarMisAnotaciones = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/voluntariados/mis-anotaciones`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;
      const data = await res.json();
      setAnotadoEn(data.map((a) => a.voluntariadoId));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const t = setTimeout(() => {
      cargarEventos();
      cargarMisAnotaciones();
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const handleAnotarse = async (id) => {
    if (!usuario) {
      setErrorGeneral(
        "Tenés que iniciar sesión para anotarte a un voluntariado.",
      );
      return;
    }
    if (anotadoEn.includes(id)) return;

    try {
      const res = await fetch(`${API_URL}/voluntariados/${id}/anotarse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        setErrorGeneral(data.error || "No se pudo anotar.");
        return;
      }

      setAnotadoEn([...anotadoEn, id]);
      // actualizamos el contador local sin tener que recargar todo
      setEventos(
        eventos.map((e) =>
          e.id === id ? { ...e, anotados: (e.anotados || 0) + 1 } : e,
        ),
      );
    } catch (err) {
      console.error(err);
      setErrorGeneral("Error de conexión al anotarse.");
    }
  };

  const handleDesanotarse = async (id) => {
    if (!usuario || !anotadoEn.includes(id)) return;
    try {
      const res = await fetch(`${API_URL}/voluntariados/${id}/desanotarse`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const data = await res.json();
        setErrorGeneral(data.error || "No se pudo desanotar.");
        return;
      }
      setAnotadoEn(anotadoEn.filter((aId) => aId !== id));
      setEventos(
        eventos.map((e) =>
          e.id === id
            ? { ...e, anotados: Math.max((e.anotados || 1) - 1, 0) }
            : e,
        ),
      );
    } catch (err) {
      console.error(err);
      setErrorGeneral("Error de conexión al desanotarse.");
    }
  };

  // ─── Geocoding de dirección (Nominatim, gratis) ──────────────
  const buscarCoordenadas = async (direccion) => {
    const query = `${direccion}, Montevideo, Uruguay`;
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.length === 0) return null;
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  };

  const handleCrear = async () => {
    if (
      !form.titulo ||
      !form.fecha ||
      !form.hora ||
      !form.bucles ||
      !form.direccion
    )
      return;

    if (!usuario) {
      setErrorDireccion("Tenés que iniciar sesión para crear un evento.");
      return;
    }

    setErrorDireccion("");
    setBuscandoDireccion(true);
    const coords = await buscarCoordenadas(form.direccion);
    setBuscandoDireccion(false);

    if (!coords) {
      setErrorDireccion(
        "No encontramos esa dirección. Probá con otra (ej: una calle y un barrio de Montevideo).",
      );
      return;
    }

    setCreando(true);
    try {
      const res = await fetch(`${API_URL}/voluntariados`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          emoji: form.emoji,
          titulo: form.titulo,
          descripcion: form.descripcion,
          fecha: form.fecha,
          hora: form.hora,
          bucles: Number(form.bucles),
          direccion: form.direccion,
          lat: coords.lat,
          lng: coords.lng,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrorDireccion(data.error || "No se pudo crear el evento.");
        return;
      }

      const nuevo = await res.json();
      setEventos(
        [...eventos, { ...nuevo, anotados: 0 }].sort(
          (a, b) => new Date(a.fecha) - new Date(b.fecha),
        ),
      );
      setForm({
        emoji: "🌱",
        titulo: "",
        descripcion: "",
        fecha: "",
        hora: "",
        bucles: "",
        direccion: "",
      });
      setModalAbierto(false);
    } catch (err) {
      console.error(err);
      setErrorDireccion("Error de conexión al crear el evento.");
    } finally {
      setCreando(false);
    }
  };

  const handleEliminar = async (id) => {
    try {
      const res = await fetch(`${API_URL}/voluntariados/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const data = await res.json();
        setErrorGeneral(data.error || "No se pudo eliminar.");
        return;
      }

      setEventos(eventos.filter((e) => e.id !== id));
      setAnotadoEn(anotadoEn.filter((aId) => aId !== id));
    } catch (err) {
      console.error(err);
      setErrorGeneral("Error de conexión al eliminar.");
    }
  };

  return (
    <div>
      <div className="vol-hero">
        <div>
          <p className="vol-eyebrow">Voluntariado</p>
          <h1>
            Sumate a una jornada
            <br />
            cerca tuyo
          </h1>
          <p>
            Participá en actividades de limpieza y reciclaje en tu barrio. Ganás
            bucles y hacés la diferencia.
          </p>
        </div>
        <button className="btn-nuevo" onClick={() => setModalAbierto(true)}>
          + Crear nuevo evento
        </button>
      </div>

      {errorGeneral && (
        <div className="vol-error-banner">
          {errorGeneral}
          <button onClick={() => setErrorGeneral("")}>✕</button>
        </div>
      )}

      <div className="vol-seccion vol-mapa-seccion">
        <h2 className="vol-seccion-titulo">Voluntariados en el mapa</h2>
        <div className="vol-mapa-wrapper">
          <MapContainer
            center={[-34.9011, -56.1645]}
            zoom={12}
            scrollWheelZoom={false}
            style={{ height: "420px", width: "100%", borderRadius: "16px" }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {eventos.map((evento) => (
              <Marker
                key={evento.id}
                position={[evento.lat, evento.lng]}
                icon={iconoVerde}
              >
                <Popup>
                  <strong>
                    {evento.emoji} {evento.titulo}
                  </strong>
                  <br />
                  📍 {evento.direccion}
                  <br />
                  {formatearFecha(evento.fecha)} · {evento.hora}hs
                  <br />+{evento.bucles} bucles
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      <div className="vol-seccion">
        <h2 className="vol-seccion-titulo">Próximos eventos</h2>

        {cargando && <p className="vol-cargando">Cargando voluntariados...</p>}

        {!cargando && eventos.length === 0 && (
          <p className="vol-cargando">Todavía no hay voluntariados creados.</p>
        )}

        <div className="vol-lista">
          {eventos.map((evento) => (
            <div key={evento.id} className="vol-evento">
              <div className="vol-fecha-col">
                <span className="vol-fecha">
                  {formatearFecha(evento.fecha)}
                </span>
                <span className="vol-hora">🕐 {evento.hora}hs</span>
              </div>

              <div className="vol-emoji">{evento.emoji}</div>

              <div className="vol-info">
                <h3>{evento.titulo}</h3>
                <p>{evento.descripcion}</p>
                <div className="vol-meta">
                  <span className="vol-anotados">
                    👥 {evento.anotados || 0} anotados
                  </span>
                  <span className="vol-direccion">📍 {evento.direccion}</span>
                  <span className="bucles-badge">+{evento.bucles} bucles</span>
                </div>
              </div>

              <div className="vol-acciones">
                <button
                  className={`btn-anotarse ${anotadoEn.includes(evento.id) ? "anotado" : ""}`}
                  onClick={() => handleAnotarse(evento.id)}
                  disabled={anotadoEn.includes(evento.id)}
                >
                  {anotadoEn.includes(evento.id) ? "✓ Anotado" : "Anotarme"}
                </button>

                {anotadoEn.includes(evento.id) && (
                  <button
                    className="btn-desanotarse"
                    onClick={() => handleDesanotarse(evento.id)}
                    title="Desanotarme de este voluntariado"
                  >
                    Desanotarme
                  </button>
                )}

                {!evento.fijo && (
                  <button
                    className="btn-eliminar"
                    onClick={() => handleEliminar(evento.id)}
                    title="Eliminar evento"
                  >
                    🗑
                  </button>
                )}
              </div>
            </div>
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
              <h2>Crear nuevo evento</h2>
              <button
                className="vol-close-btn"
                onClick={() => setModalAbierto(false)}
              >
                ✕
              </button>
            </div>

            {!usuario && (
              <p className="vol-form-error">
                Necesitás iniciar sesión para crear un evento.
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
                    <option>🌱</option>
                    <option>🌳</option>
                    <option>♻️</option>
                    <option>🏫</option>
                    <option>🌊</option>
                    <option>🚮</option>
                    <option>🤝</option>
                  </select>
                </div>
                <div className="vol-form-grupo" style={{ flex: 1 }}>
                  <label>Nombre del evento *</label>
                  <input
                    type="text"
                    placeholder="Ej: Limpieza en Parque Batlle"
                    value={form.titulo}
                    onChange={(e) =>
                      setForm({ ...form, titulo: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="vol-form-grupo">
                <label>Descripción</label>
                <textarea
                  placeholder="Contá de qué se trata el evento..."
                  value={form.descripcion}
                  onChange={(e) =>
                    setForm({ ...form, descripcion: e.target.value })
                  }
                />
              </div>

              <div className="vol-form-grupo">
                <label>Dirección *</label>
                <input
                  type="text"
                  placeholder="Ej: Av. 18 de Julio 1500, Cordón"
                  value={form.direccion}
                  onChange={(e) =>
                    setForm({ ...form, direccion: e.target.value })
                  }
                />
                {errorDireccion && (
                  <span className="vol-form-error">{errorDireccion}</span>
                )}
              </div>

              <div className="vol-form-fila">
                <div className="vol-form-grupo">
                  <label>Fecha *</label>
                  <input
                    type="date"
                    value={form.fecha}
                    onChange={(e) =>
                      setForm({ ...form, fecha: e.target.value })
                    }
                  />
                </div>
                <div className="vol-form-grupo">
                  <label>Hora *</label>
                  <input
                    type="time"
                    value={form.hora}
                    onChange={(e) => setForm({ ...form, hora: e.target.value })}
                  />
                </div>
                <div className="vol-form-grupo">
                  <label>Bucles a ganar *</label>
                  <input
                    type="number"
                    placeholder="Ej: 80"
                    value={form.bucles}
                    onChange={(e) =>
                      setForm({ ...form, bucles: e.target.value })
                    }
                  />
                </div>
              </div>
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
                onClick={handleCrear}
                disabled={
                  !form.titulo ||
                  !form.fecha ||
                  !form.hora ||
                  !form.bucles ||
                  !form.direccion ||
                  buscandoDireccion ||
                  creando ||
                  !usuario
                }
              >
                {buscandoDireccion
                  ? "Buscando dirección..."
                  : creando
                    ? "Creando..."
                    : "Crear evento"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Voluntariado;
