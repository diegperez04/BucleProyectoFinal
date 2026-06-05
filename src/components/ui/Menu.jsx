function Menu({ seccionActiva, setSeccionActiva }) {
  const menuItems = [
    { id: "store", label: "Tienda" },
    { id: "volunteering", label: "Voluntariado" },
    { id: "community", label: "Comunidad" },
    { id: "operating", label: "Como Funciona" },
  ];

  return (
    <ul className="">
      {menuItems.map((item) => (
        <li key={item.id}>
          <button
            onClick={() => setSeccionActiva(item.id)}
            className={'${seccionActiva === item.id ? "active" : ""}'}
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Menu;
