import Home from "../../pages/Home";
import Voluntariado from "../../pages/Voluntariado";
import Tienda from "../../pages/Tienda";
import MiPerfil from "../../pages/MiPerfil";
import Comunidad from "../../pages/Comunidad";
import ComoFunciona from "../../pages/ComoFunciona";

function Header({ seccionActiva = "home" }) {
  const renderContenidoPrincipal = () => {
    switch (seccionActiva) {
      case "home":
        return <Home />;
      case "operating":
        return <ComoFunciona />;
      case "store":
        return <Tienda />;
      case "volunteering":
        return <Voluntariado />;
      case "community":
        return <Comunidad />;
      case "profile":
        return <MiPerfil />;
    }
  };

  return (
    <div className="">
      <main>{renderContenidoPrincipal()}</main>
    </div>
  );
}

export default Header;
