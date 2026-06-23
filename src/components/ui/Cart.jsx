import { useState, useEffect, useRef } from "react";
import Card from "./Card";
import Tierra from "../../assets/Tierra.png";

function Cart() {
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [bucles, setBucles] = useState(1000);
  const instanceId = useRef(null);

  useEffect(() => {
    instanceId.current = Math.random().toString(36).slice(2, 9);
    const id = instanceId.current;
    console.log(`Cart mounted id=${id}`);
    window.__cart_instances = window.__cart_instances || {};
    // initial length is 0 on mount
    window.__cart_instances[id] = {
      mounted: true,
      len: 0,
    };
    return () => {
      console.log(`Cart unmounted id=${id}`);
      if (window.__cart_instances) delete window.__cart_instances[id];
    };
  }, []);

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

  const agregarAlCarrito = (producto) => {
    console.log(
      "agregarAlCarrito called",
      producto,
      "instance",
      instanceId.current,
    );
    setCarrito((prev) => {
      console.log(
        "setCarrito prev length",
        prev.length,
        "-> new length",
        prev.length + 1,
        "instance",
        instanceId.current,
      );
      return [...prev, producto];
    });
  };

  useEffect(() => {
    console.log("carrito state changed", carrito);

    setTimeout(() => {
      try {
        const btn = document.querySelector(".tienda-seccion > button");
        if (btn) {
          console.log(
            "button text after render:",
            btn.innerText,
            "state length:",
            carrito.length,
          );
        } else {
          console.log("button not found in DOM to compare with state");
        }
      } catch (e) {
        console.log("error reading button text", e);
      }
    }, 0);
    if (
      window.__cart_instances &&
      window.__cart_instances[instanceId.current]
    ) {
      window.__cart_instances[instanceId.current].len = carrito.length;
      window.__cart_instances[instanceId.current].updatedAt = Date.now();
    }
  }, [carrito]);

  const prevLen = useRef(0);
  useEffect(() => {
    if (carrito.length > prevLen.current) {
      setMostrarCarrito(true);
    }
    prevLen.current = carrito.length;
  }, [carrito]);

  const total = carrito.reduce((acc, item) => acc + item.bucles, 0);

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => {
      const res = prev.filter((item) => item.id !== id);
      console.log(
        "eliminarDelCarrito",
        id,
        "prevLen",
        prev.length,
        "newLen",
        res.length,
        "instance",
        instanceId.current,
      );
      return res;
    });
  };

  const realizarCanje = () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    const totalCarrito = carrito.reduce((acc, item) => acc + item.bucles, 0);
    if (bucles < totalCarrito) {
      alert("No tenes suficientes bucles para realizar este canje");
      return;
    }

    setBucles((prev) => prev - totalCarrito);
    alert("Canje realizado con exito");
    console.log("realizarCanje clearing carrito, instance", instanceId.current);
    setCarrito([]);
    setMostrarCarrito(false);
  };

  return (
    <div>
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

            <p>Total: {total} bucles</p>

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

export default Cart;
