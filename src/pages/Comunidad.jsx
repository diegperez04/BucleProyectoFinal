import { useState } from "react";
import "./Comunidad.css";

//aca los datos vienen del backend, estos no van a quedar, tenems que hacer este metodo, GET ${API_URL}/canastas?estado=Disponible
const canastasComunidad = [
  {
    id: 1,
    usuario: "María Fernández",
    foto: "🧃",
    descripcion: "Botellas de plástico y envases limpios",
    ubicacion: "Cordón, Montevideo",
    cantidad: "5 kg aprox.",
    bucles: 25,
  },
  {
    id: 2,
    usuario: "Joaquín Pérez",
    foto: "📦",
    descripcion: "Cajas de cartón y diarios viejos",
    ubicacion: "Pocitos, Montevideo",
    cantidad: "3 kg aprox.",
    bucles: 15,
  },
  {
    id: 3,
    usuario: "Lucía Gómez",
    foto: "🍾",
    descripcion: "Frascos y botellas de vidrio",
    ubicacion: "Parque Batlle, Montevideo",
    cantidad: "8 kg aprox.",
    bucles: 35,
  },
  {
    id: 4,
    usuario: "Andrés Silva",
    foto: "👕",
    descripcion: "Ropa en buen estado para reutilizar",
    ubicacion: "Malvín, Montevideo",
    cantidad: "2 bolsas grandes",
    bucles: 20,
  },
];

function Comunidad() {
  const [retiradas, setRetiradas] = useState([]);

  const handleRetirar = (id) => {
    if (retiradas.includes(id)) return;
    setRetiradas([...retiradas, id]);

    //cuando tengamos backend tenemos que hacer esto, fetch(`${API_URL}/canastas/${id}/retirar`, { method: "PATCH" });
  };

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

      {/*canastas */}
      <div className="comunidad-seccion">
        <div className="comunidad-grid">
          {canastasComunidad.map((c) => {
            const retirada = retiradas.includes(c.id);
            return (
              <div key={c.id} className="comunidad-card">
                <div className="comunidad-img">
                  <span>{c.foto}</span>
                  <span className="comunidad-bucles-tag">
                    +{c.bucles} bucles
                  </span>
                </div>
                <div className="comunidad-body">
                  <p className="comunidad-usuario">👤 {c.usuario}</p>
                  <p className="comunidad-descripcion">{c.descripcion}</p>
                  <div className="comunidad-meta">
                    <span>📍 {c.ubicacion}</span>
                    <span>{c.cantidad}</span>
                  </div>
                  <button
                    className={`btn-retirar ${retirada ? "retirado" : ""}`}
                    onClick={() => handleRetirar(c.id)}
                    disabled={retirada}
                  >
                    {retirada ? "✓ Vas a retirarla" : "Quiero retirarla"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Comunidad;
