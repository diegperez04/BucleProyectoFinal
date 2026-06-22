import Card from "../components/ui/Card";
import Cart from "../components/ui/Cart";
import Tierra from "../assets/Tierra.png";
import "./Tienda.css";
import { useState } from "react";

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
    <div className="tienda-page">
      <Cart />
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
