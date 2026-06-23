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

  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [bucles, setBucles] = useState(1000);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => [...prev, producto]);
  };

  const total = carrito.reduce((acc, item) => acc + item.bucles, 0);

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const realizarCanje = () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    const totalLocal = carrito.reduce((acc, item) => acc + item.bucles, 0);
    if (bucles < totalLocal) {
      alert("No tenes suficientes bucles para realizar este canje");
      return;
    }

    setBucles((prev) => prev - totalLocal);
    alert("Canje realizado con exito");
    setCarrito([]);
    setMostrarCarrito(false);
  };

  return (
    <div className="tienda-page">
      <Cart />

      {/* tienda */}
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
      {/* productos */}
      <div className="tienda-seccion">
        <button onClick={() => setMostrarCarrito(true)}>
          🛒 Ver carrito ({carrito.length})
        </button>
        <p>{bucles} bucles</p>
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
              onCanjear={() => {
                agregarAlCarrito(producto);
                alert(`¡${producto.title} fue agregado al carrito!`);
              }}
            />
          ))}
        </div>
      </div>
      {mostrarCarrito && (
        <div className="modal">
          <div className="modal-contenido">
            <h3>Carrito</h3>

            {carrito.map((item) => (
              <div key={item.id} className="carrito-item">
                <span>
                  {item.title} - {item.bucles} bucles
                </span>
                <button onClick={() => eliminarDelCarrito(item.id)}>❌</button>
              </div>
            ))}

            <p>Total:{total} bucles</p>

            <button onClick={() => setMostrarCarrito(false)}>
              Cerrar carrito
            </button>

            <button onClick={realizarCanje}>Canjear Productos</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tienda;
