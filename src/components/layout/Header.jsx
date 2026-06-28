import Home from "../../pages/Home";
import Voluntariado from "../../pages/Voluntariado";
import Tienda from "../../pages/Tienda";
import MiPerfil from "../../pages/MiPerfil";
import Comunidad from "../../pages/Comunidad";
import SobreNosotros from "../../pages/SobreNosotros";

import Login from "../../pages/Login";

function Header({ seccionActiva = "home", setSeccionActiva }) {
  const renderContenidoPrincipal = () => {
    switch (seccionActiva) {
      case "home":
        return <Home setSeccionActiva={setSeccionActiva} />;

      case "store":
        return <Tienda />;
      case "volunteering":
        return <Voluntariado />;
      case "community":
        return <Comunidad />;
      case "about":
        return <SobreNosotros />;
      case "login":
        return <Login onIngreso={() => setSeccionActiva("profile")} />;
      case "profile":
        return <MiPerfil onNecesitaLogin={() => setSeccionActiva("login")} />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="">
      <main>{renderContenidoPrincipal()}</main>
    </div>
  );
}

export default Header;
