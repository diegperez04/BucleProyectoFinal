import { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import "./App.css";

function App() {
  const [seccionActiva, setSeccionActiva] = useState("home");

  return (
    <AuthProvider>
      <div>
        <div className="Menu">
          <Navbar
            seccionActiva={seccionActiva}
            setSeccionActiva={setSeccionActiva}
          />
        </div>
        <div className="">
          <Header
            seccionActiva={seccionActiva}
            setSeccionActiva={setSeccionActiva}
          />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
