function Menu({ seccionActiva, setSeccionActiva }) {
  const menuItems = [
    { id: "home", label: "Inicio" },
    { id: "store", label: "Tienda" },
    { id: "volunteering", label: "Voluntariado" },
    { id: "community", label: "Comunidad" },
    { id: "profile", label: "Mi Perfil" },
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
    </ul>
  );
}

export default Menu;
