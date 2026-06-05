import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import Home from "./pages/Home";
import Navbar from "./components/layout/Navbar";
import "./App.css";

function App() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Home />
      </div>
    </div>
  );
}

export default App;
