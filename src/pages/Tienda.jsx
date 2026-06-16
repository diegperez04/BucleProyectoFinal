import Card from "../components/ui/Card";

import Tierra from "../assets/Tierra.png";
import "./Tienda.css";

function Tienda() {
  const productos = [
    {
      id: "1",
      title: "Botella Ecológica",
      description: "Reutilizable",
      price: "300",
      emoji: "💧",
    },
    {
      id: "2",
      title: "Tote Bag",
      description: "Bolsa reutilizable",
      price: "280",
      emoji: "🛍️",
    },
  ];

  return (
    <div>
      <div className="divtienda-uno">
        <div>
          <h1>TIENDA VIRTUAL</h1>
          <h2>
            Aprovechá los beneficios <br /> por hacer un mundo mejor
          </h2>
        </div>
        <div className="div-imagen">
          <img className="tienda-imagen" src={Tierra} alt="Tierra" />
        </div>
      </div>
      <div className="Tarjeta">
        {productos.map((producto) => (
          <Card
            key={producto.id}
            type="tienda"
            {...producto}
            onCanjear={() => alert("Producto Canjeado")}
          />
        ))}
      </div>
    </div>
  );
}

//Practicando el uso de tarjetas para ver como quedan
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
