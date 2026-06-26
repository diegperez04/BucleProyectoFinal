import { useAuth } from "../../context/useAuth";

function Menu({ seccionActiva, setSeccionActiva }) {
  const { usuario } = useAuth();

  const menuItems = [
    { id: "home", label: "Inicio" },
    { id: "store", label: "Tienda" },
    { id: "volunteering", label: "Voluntariado" },
    { id: "community", label: "Comunidad" },
    { id: "operating", label: "Como Funciona" },
  ];

  return (
    <ul className="Menu">
      {menuItems.map((item) => (
        <li key={item.id}>
          <button
            onClick={() => setSeccionActiva(item.id)}
            className={`BotonMenu ${seccionActiva === item.id ? "active" : ""}`}
          >
            {item.label}
          </button>
        </li>
      ))}

      <li>
        <button
          onClick={() => setSeccionActiva(usuario ? "profile" : "login")}
          className={`BotonMenu ${seccionActiva === "profile" || seccionActiva === "login" ? "active" : ""}`}
        >
          {usuario ? `Hola, ${usuario.nombre}` : "Ingresar"}
        </button>
      </li>
    </ul>
  );
}

export default Menu;
