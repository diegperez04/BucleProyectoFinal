import Menu from "../ui/Menu";

function Navbar({ seccionActiva, setSeccionActiva }) {
  return (
    <nav>
      <div className="Navbar">
        <div>
          <h1> TITULO PÁGINA</h1>
        </div>
        <Menu
          seccionActiva={seccionActiva}
          setSeccionActiva={setSeccionActiva}
        />
      </div>
    </nav>
  );
}

export default Navbar;
