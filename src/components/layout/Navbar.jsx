import Menu from "../ui/Menu";
import Logo from "../../assets/BUCLE04-02.jpg";

function Navbar({ seccionActiva, setSeccionActiva }) {
  return (
    <nav>
      <div className="Navbar">
        <div>
          <img className="LogoInicio" src={Logo} alt="Logo" />
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
