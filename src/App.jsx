import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import "./App.css";

function App() {
  const [seccionActiva, setSeccionActiva] = useState("home");

  return (
    <div>
      <div className="Menu">
        <Navbar
          seccionActiva={seccionActiva}
          setSeccionActiva={setSeccionActiva}
        />
      </div>
      <div className="">
        <Header />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
