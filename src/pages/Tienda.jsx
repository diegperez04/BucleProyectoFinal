import Card from "../components/ui/Card";

import Tierra from "../assets/Tierra.png";
import "./Tienda.css";

function Tienda() {
  const productos = [
    {
      id: "1",
      title: "Botella Ecológica",
      category: "Productos sustentables",
      description: "Reutilizable",
      bucles: 300,
      emoji: "💧",
      bgColor: "verde",
      ecoTag: true,
    },
    {
      id: "2",
      title: "Tote Bag",
      category: "Accesorios",
      description: "Bolsa reutilizable",
      bucles: 280,
      emoji: "🛍️",
      bgColor: "marron",
    },
    {
      id: "3",
      title: "Cupón 20% off",
      category: "Supermercado",
      bucles: 200,
      emoji: "🛒",
      bgColor: "verde",
      ecoTag: true,
    },
    {
      id: "4",
      title: "Kit limpieza ecológica",
      category: "Hogar",
      bucles: 150,
      emoji: "🧴",
      bgColor: "mix",
    },
  ];

  return (
    <div>
      //tienda
      <div className="tienda">
        <div className="tienda-texto">
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
        <div className="tienda-img">
          <img src={Tierra} alt="Tierra" />
        </div>
      </div>
      //productos
      <div className="tienda-seccion">
        <h2 className="tienda-seccion-titulo">Recompensas disponibles</h2>
        <div className="tienda-grid">
          {productos.map((producto) => (
            <Card
              key={producto.id}
              type="producto"
              emoji={producto.emoji}
              title={producto.title}
              category={producto.category}
              bucles={producto.bucles}
              bgColor={producto.bgColor}
              ecoTag={producto.ecoTag}
              onCanjear={() => alert(`¡Canjeaste: ${producto.title}!`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/*Practicando el uso de tarjetas para ver como quedan
function Home() {
  return (
    <div style={{ padding: "2rem", display: "flex", gap: "1rem" }}>
      <Card
        type="producto"
        emoji="🛒"
        title="Cupón 20% off en compras"
        category="Supermercado"
        bucles={200}
        bgColor="verde"
        ecoTag
        onCanjear={() => console.log("canjeado")}
      />


      <Card
        type="voluntariado"
        emoji="🌳"
        title="Limpieza en Parque Rodó"
        description="Juntamos residuos y separamos materiales reciclables."
        date="Sáb 31 mayo · 9:00"
        bucles={80}
        onAnotarse={() => console.log("anotado")}
      />
    </div>
  );
}
export default Home;
*/
export default Tienda;
