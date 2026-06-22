import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import "./Voluntariado.css";

// ícono personalizado para los pines del mapa
const iconoVerde = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.6.0/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const eventosIniciales = [
  {
    id: 1,
    emoji: "🌳",
    title: "Limpieza en Parque Rodó",
    description:
      "Juntamos residuos y separamos materiales reciclables. Materiales provistos. Apto para toda la familia.",
    date: "2026-05-31",
    hora: "9:00",
    bucles: 80,
    anotados: 12,
    direccion: "Parque Rodó, Montevideo",
    lat: -34.9135,
    lng: -56.1577,
    fijo: true,
  },
  {
    id: 2,
    emoji: "♻️",
    title: "Punto verde en La Feria",
    description:
      "Ayudamos a los feriantes a separar sus residuos correctamente y educamos a los visitantes.",
    date: "2026-06-01",
    hora: "10:00",
    bucles: 60,
    anotados: 8,
    direccion: "Tristán Narvaja, Montevideo",
    lat: -34.9011,
    lng: -56.1645,
    fijo: true,
  },
  {
    id: 3,
    emoji: "🏫",
    title: "Taller de reciclaje escolar",
    description:
      "Damos talleres de educación ambiental en escuelas primarias de Montevideo.",
    date: "2026-06-05",
    hora: "14:00",
    bucles: 100,
    anotados: 5,
    direccion: "Cordón, Montevideo",
    lat: -34.8941,
    lng: -56.1675,
    fijo: true,
  },
];

function formatearFecha(fecha) {
  const opciones = { weekday: "short", day: "numeric", month: "long" };
  return new Date(fecha + "T00:00:00").toLocaleDateString("es-UY", opciones);
}
function Voluntariado() {
  const [eventos, setEventos] = useState(eventosIniciales);
  const [anotadoEn, setAnotadoEn] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);

  // estado del formulario
  const [form, setForm] = useState({
    emoji: "🌱",
    title: "",
    description: "",
    date: "",
    hora: "",
    bucles: "",
    direccion: "",
  });

  const [buscandoDireccion, setBuscandoDireccion] = useState(false);
  const [errorDireccion, setErrorDireccion] = useState("");

  const handleAnotarse = (id) => {
    if (anotadoEn.includes(id)) return;
    setAnotadoEn([...anotadoEn, id]);
    setEventos(
      eventos.map((e) =>
        e.id === id ? { ...e, anotados: e.anotados + 1 } : e,
      ),
    );
  };

  // busca coordenadas a partir de una dirección usando Nominatim (OpenStreetMap, gratis)
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
      !form.title ||
      !form.date ||
      !form.hora ||
      !form.bucles ||
      !form.direccion
    )
      return;

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

    const nuevo = {
      id: Date.now(),
      emoji: form.emoji,
      title: form.title,
      description: form.description,
      date: form.date,
      hora: form.hora,
      bucles: Number(form.bucles),
      anotados: 0,
      direccion: form.direccion,
      lat: coords.lat,
      lng: coords.lng,
      fijo: false,
    };
    // insertar ordenado por fecha
    const nuevos = [...eventos, nuevo].sort(
      (a, b) => new Date(a.date) - new Date(b.date),
    );
    setEventos(nuevos);
    setForm({
      emoji: "🌱",
      title: "",
      description: "",
      date: "",
      hora: "",
      bucles: "",
      direccion: "",
    });
    setModalAbierto(false);
  };

  const handleEliminar = (id) => {
    setEventos(eventos.filter((e) => e.id !== id));
    setAnotadoEn(anotadoEn.filter((aId) => aId !== id));
  };

  return (
    <div>
      {/* Hero */}
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

      {/* Mapa de Montevideo */}
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
                    {evento.emoji} {evento.title}
                  </strong>
                  <br />
                  📍 {evento.direccion}
                  <br />
                  {formatearFecha(evento.date)} · {evento.hora}hs
                  <br />+{evento.bucles} bucles
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* Lista de eventos */}
      <div className="vol-seccion">
        <h2 className="vol-seccion-titulo">Próximos eventos</h2>
        <div className="vol-lista">
          {eventos.map((evento) => (
            <div key={evento.id} className="vol-evento">
              <div className="vol-fecha-col">
                <span className="vol-fecha">{formatearFecha(evento.date)}</span>
                <span className="vol-hora">🕐 {evento.hora}hs</span>
              </div>

              <div className="vol-emoji">{evento.emoji}</div>

              <div className="vol-info">
                <h3>{evento.title}</h3>
                <p>{evento.description}</p>
                <div className="vol-meta">
                  <span className="vol-anotados">
                    👥 {evento.anotados} anotados
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

      {/* Modal crear evento */}
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
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="vol-form-grupo">
                <label>Descripción</label>
                <textarea
                  placeholder="Contá de qué se trata el evento..."
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
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
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
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
                  !form.title ||
                  !form.date ||
                  !form.hora ||
                  !form.bucles ||
                  !form.direccion ||
                  buscandoDireccion
                }
              >
                {buscandoDireccion ? "Buscando dirección..." : "Crear evento"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Voluntariado;
