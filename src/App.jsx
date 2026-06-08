import { useState } from "react";

import Home from "./pages/Home";
import Navbar from "./components/layout/Navbar";
import Voluntariado from "./pages/Voluntariado";
import Tienda from "./pages/Tienda";
import MiPerfil from "./pages/MiPerfil";
import Comunidad from "./pages/Comunidad";
import ComoFunciona from "./pages/ComoFunciona";
import "./App.css";

function App() {
  const [seccionActiva, setSeccionActiva] = useState("home");

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
    <div>
      <div className="Menu">
        <Navbar
          seccionActiva={seccionActiva}
          setSeccionActiva={setSeccionActiva}
        />
      </div>
      <div className="">
        <main>{renderContenidoPrincipal()}</main>
      </div>
    </div>
  );
}

export default App;
