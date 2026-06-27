import { useAuth } from "../../context/useAuth";

function Menu({ seccionActiva, setSeccionActiva }) {
  const { usuario } = useAuth();
  console.log("Menu.jsx - usuario:", usuario);
  const menuItems = [
    { id: "home", label: "Inicio" },
    { id: "store", label: "Tienda" },
    { id: "volunteering", label: "Voluntariado" },
    { id: "community", label: "Comunidad" },
    { id: "about", label: "Sobre Nosotros" },
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

      {usuario && (
        <li>
          <span className="BuclesNavbar">🪙 {usuario.bucles ?? 0} bucles</span>
        </li>
      )}

      <li>
        <button
          onClick={() => setSeccionActiva(usuario ? "profile" : "login")}
          className={`BotonMenu ${seccionActiva === "profile" || seccionActiva === "login" ? "active" : ""}`}
        >
          {usuario ? `${usuario.avatar ?? "🙂"} ${usuario.nombre}` : "Ingresar"}
        </button>
      </li>
    </ul>
  );
}

export default Menu;
