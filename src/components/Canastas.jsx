import { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../styles/Canastas.css";

const iconoVerde = new L.Icon({
  iconUrl: "https://i.ibb.co/5WF5ND7H/ICON-2.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.6.0/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const canastasIniciales = [
  {
    id: 1,
    imagen: "https://www.fundacionaquae.org/wp-content/uploads/2015/01/botellas-de-vidrio.jpg",
    titulo: "Canasta de botellas",
    descripcion: "Colección de botellas de vidrio para reciclar. En buen estado.",
    elementos: ["Botellas de vidrio", "Frascos de mermelada", "Botellas de vino"],
    miembro: {
      nombre: "Juan Pérez",
      foto: "https://i.pravatar.cc/48?img=1",
    },
    lat: -34.9135,
    lng: -56.1577,
    direccion: "Parque Rodó, Montevideo",
    disponible: true,
  },
  {
    id: 2,
    imagen: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop",
    titulo: "Materiales de construcción",
    descripcion: "Madera, tuberías PVC y otros materiales para reutilizar.",
    elementos: ["Tablas de madera", "Tuberías PVC", "Herrajes"],
    miembro: {
      nombre: "María González",
      foto: "https://i.pravatar.cc/48?img=2",
    },
    lat: -34.9011,
    lng: -56.1645,
    direccion: "Tristán Narvaja, Montevideo",
    disponible: true,
  },
  {
    id: 3,
    imagen: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    titulo: "Ropa y textiles",
    descripcion: "Prendas de ropa en buen estado para donar o reciclar.",
    elementos: ["Camisetas", "Pantalones", "Abrigos", "Bufandas"],
    miembro: {
      nombre: "Carlos López",
      foto: "https://i.pravatar.cc/48?img=3",
    },
    lat: -34.8941,
    lng: -56.1675,
    direccion: "Cordón, Montevideo",
    disponible: true,
  },
];

function Canastas() {
  const [canastas, setCanastas] = useState(canastasIniciales);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [canastaSel, setCanastaSel] = useState(null);

  const abrirModal = (canasta) => {
    setCanastaSel(canasta);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setCanastaSel(null);
  };

  const retirarCanasta = (id) => {
    setCanastas(canastas.filter((c) => c.id !== id));
    cerrarModal();
  };

  return (
    <div className="canastas-seccion">
      <h2 className="canastas-titulo">Canastas de la comunidad</h2>
      <p className="canastas-subtitulo">
        Visualiza lo que otros miembros están compartiendo para reciclar
      </p>

      <div className="canastas-grid">
        {canastas.length > 0 ? (
          canastas.map((canasta) => (
            <div
              key={canasta.id}
              className="canasta-tarjeta"
              onClick={() => abrirModal(canasta)}
            >
              <div className="canasta-imagen">
                <img src={canasta.imagen} alt={canasta.titulo} />
              </div>
              <div className="canasta-contenido">
                <h3 className="canasta-titulo-card">{canasta.titulo}</h3>
                <p className="canasta-descripcion">{canasta.descripcion}</p>
                <div className="canasta-miembro">
                  <img
                    src={canasta.miembro.foto}
                    alt={canasta.miembro.nombre}
                    className="canasta-foto-miembro"
                  />
                  <span className="canasta-nombre-miembro">
                    {canasta.miembro.nombre}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="canastas-vacio">No hay canastas disponibles por ahora.</p>
        )}
      </div>

      {/* Modal */}
      {modalAbierto && canastaSel && (
        <div className="canasta-modal-overlay" onClick={cerrarModal}>
          <div
            className="canasta-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="canasta-close-btn" onClick={cerrarModal}>
              ✕
            </button>

            <div className="canasta-modal-contenido">
              <div className="canasta-modal-imagen">
                <img src={canastaSel.imagen} alt={canastaSel.titulo} />
              </div>

              <div className="canasta-modal-info">
                <h2>{canastaSel.titulo}</h2>
                <p className="canasta-modal-descripcion">
                  {canastaSel.descripcion}
                </p>

                <div className="canasta-elementos">
                  <h3>Elementos incluidos:</h3>
                  <ul>
                    {canastaSel.elementos.map((elem, idx) => (
                      <li key={idx}>{elem}</li>
                    ))}
                  </ul>
                </div>

                <div className="canasta-miembro-info">
                  <h3>Aportado por:</h3>
                  <div className="canasta-miembro-card">
                    <img
                      src={canastaSel.miembro.foto}
                      alt={canastaSel.miembro.nombre}
                    />
                    <span>{canastaSel.miembro.nombre}</span>
                  </div>
                </div>

                <div className="canasta-mapa-mini">
                  <h3>Ubicación:</h3>
                  <MapContainer
                    center={[canastaSel.lat, canastaSel.lng]}
                    zoom={15}
                    scrollWheelZoom={false}
                    style={{
                      height: "200px",
                      width: "100%",
                      borderRadius: "12px",
                    }}
                  >
                    <TileLayer
                      attribution="&copy; OpenStreetMap contributors"
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                      position={[canastaSel.lat, canastaSel.lng]}
                      icon={iconoVerde}
                    />
                  </MapContainer>
                  <p className="canasta-direccion">📍 {canastaSel.direccion}</p>
                </div>

                <button
                  className="canasta-btn-retirar"
                  onClick={() => retirarCanasta(canastaSel.id)}
                >
                  Retirar canasta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Canastas;
