import "./Home.css";

function Home({ setSeccionActiva }) {
  const progreso = [
    { label: "Plástico", kg: 4.2, porcentaje: 70 },
    { label: "Papel y cartón", kg: 2.8, porcentaje: 46 },
    { label: "Vidrio", kg: 1.5, porcentaje: 25 },
  ];

  const recompensas = [
    { texto: "20% off en ferretería local — 50 bucles más", color: "#a8d4c5" },
    { texto: "Bolsa ecológica gratis — 120 bucles más", color: "#e8c49a" },
  ];
  return (
    <div>
      <div className="divprincipal">
        <div className="divizquierda">
          <p className="subtitulo-up">Plataforma de reciclaje y voluntariado</p>
          <h1 className="titulo-up">
            Reciclar tiene <br />
            <em>recompensas reales</em>
          </h1>
          <p className="subtitulo-down">
            Juntá bucles reciclando y haciendo voluntariado. Canjeá descuntos y
            beneficios para tu vida diaria mientras cuidas el planeta.
          </p>
          <div className="botones-home">
            <button
              onClick={() => setSeccionActiva("community")}
              className="btn-home-main"
            >
              Empezar a reciclar →
            </button>
            <button
              onClick={() => setSeccionActiva("store")}
              className="btn-home-sec"
            >
              Ver la tienda
            </button>
          </div>
          <div className="home-stats">
            <div className="stat">
              <strong>12.400</strong>
              <span>recicladores activos</span>
            </div>
            <div className="stat">
              <strong>3,2 t</strong>
              <span>residuos recuperados</span>
            </div>
            <div className="stat">
              <strong>850</strong>
              <span>beneficios canjeados</span>
            </div>
          </div>
        </div>
        <div className="divderecha">
          <h3>Tu progreso este mes</h3>
          {progreso.map((item) => (
            <div key={item.label} className="progreso-item">
              <div className="progreso-label">
                <span>{item.label}</span>
                <span>{item.kg} kg</span>
              </div>
              <div className="progreso-barra">
                <div
                  className="progreso-fill"
                  style={{ width: `${item.porcentaje}%` }}
                />
              </div>
            </div>
          ))}
          <p className="proximas-label">Próximas recompensas desbloqueables</p>

          {recompensas.map((r, i) => (
            <div key={i} className="recompensa-item">
              <div className="recompensa-dot" style={{ background: r.color }} />
              <span>{r.texto}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
