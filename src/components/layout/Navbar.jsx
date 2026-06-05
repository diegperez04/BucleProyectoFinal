import Menu from "../ui/Menu";

function Navbar({ seccionActiva, setSeccionActiva }) {
  return (
    <nav className="Navbar">
      <div>
        <h1> TITULO PÁGINA</h1>
      </div>

      <Menu seccionActiva={seccionActiva} setSeccionActiva={setSeccionActiva} />
    </nav>
  );
}

export default Navbar;
