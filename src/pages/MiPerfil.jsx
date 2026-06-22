import { useState } from "react";
import "./MiPerfil.css";
import CrearCanasta from "../components/ui/CrearCanasta";

const voluntariados = [
  {
    id: 1,
    nombre: "Limpieza de Playa",
    fecha: "15/06/2026",
  },
  {
    id: 2,
    nombre: "Reciclaje en Escuela",
    fecha: "20/06/2026",
  },
];

const historial = [
  {
    id: 1,
    accion: "Participó en voluntariado",
    puntos: 50,
  },
  {
    id: 2,
    accion: "Retiró una canasta",
    puntos: 20,
  },
];

function MiPerfil() {
  const [seccion, setSeccion] = useState("datos");

  const [canastas, setCanastas] = useState([
    {
      id: 1,
      material: "Botellas plásticas",
      cantidad: 20,
      ubicacion: "Pocitos",
      descripcion: "Botellas limpias",
      foto: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
    },
  ]);

  const [modo, setModo] = useState("login");

  const [registro, setRegistro] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

  const logueado = localStorage.getItem("logueado");

  const handleRegistro = (e) => {
    e.preventDefault();

    localStorage.setItem("usuario", JSON.stringify(registro));

    alert("Usuario registrado");

    setModo("login");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      usuarioGuardado &&
      usuarioGuardado.email === login.email &&
      usuarioGuardado.password === login.password
    ) {
      localStorage.setItem("logueado", "true");

      window.location.reload();
    } else {
      alert("Datos incorrectos");
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem("logueado");
    window.location.reload();
  };

  const agregarCanasta = (nuevaCanasta) => {
    setCanastas([...canastas, nuevaCanasta]);
  };

  if (logueado && usuarioGuardado) {
    return (
      <div className="perfil-container">
        <div className="perfil-card grande">
          <img
            src="https://i.pravatar.cc/150"
            alt="perfil"
            className="foto-perfil"
          />

          <h1>{usuarioGuardado.nombre}</h1>

          <p>{usuarioGuardado.email}</p>

          <div className="bucles">🌱 450 Bucles</div>

          <div className="tabs">
            <button onClick={() => setSeccion("datos")}>Datos</button>

            <button onClick={() => setSeccion("voluntariados")}>
              Voluntariados
            </button>

            <button onClick={() => setSeccion("canastas")}>Canastas</button>

            <button onClick={() => setSeccion("historial")}>Historial</button>
          </div>

          <div className="contenido">
            {seccion === "datos" && (
              <div className="item">
                <h3>Mis Datos</h3>

                <p>Nombre: {usuarioGuardado.nombre}</p>

                <p>Email: {usuarioGuardado.email}</p>
              </div>
            )}

            {seccion === "voluntariados" &&
              voluntariados.map((voluntariado) => (
                <div key={voluntariado.id} className="item">
                  <h3>{voluntariado.nombre}</h3>
                  <p>{voluntariado.fecha}</p>
                </div>
              ))}

            <>
              <CrearCanasta agregarCanasta={agregarCanasta} />

              {canastas.map((canasta) => (
                <div key={canasta.id} className="item">
                  {canasta.foto && (
                    <img
                      src={canasta.foto}
                      alt={canasta.material}
                      className="foto-canasta"
                    />
                  )}

                  <h3>{canasta.material}</h3>

                  <p>📦 {canasta.cantidad}</p>

                  <p>📍 {canasta.ubicacion}</p>

                  <p>{canasta.descripcion}</p>
                </div>
              ))}
            </>

            {seccion === "historial" &&
              historial.map((item) => (
                <div key={item.id} className="item">
                  <p>{item.accion}</p>

                  <strong>+{item.puntos} Bucles</strong>
                </div>
              ))}
          </div>

          <button className="btn-cerrar" onClick={cerrarSesion}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="perfil-container">
      <div className="formulario-card">
        <div className="selector">
          <button
            onClick={() => setModo("login")}
            className={modo === "login" ? "activo" : ""}
          >
            Iniciar Sesión
          </button>

          <button
            onClick={() => setModo("registro")}
            className={modo === "registro" ? "activo" : ""}
          >
            Crear Cuenta
          </button>
        </div>

        {modo === "login" ? (
          <form onSubmit={handleLogin}>
            <h2>Bienvenido a Bucle</h2>

            <input
              type="email"
              placeholder="Correo electrónico"
              onChange={(e) =>
                setLogin({
                  ...login,
                  email: e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="Contraseña"
              onChange={(e) =>
                setLogin({
                  ...login,
                  password: e.target.value,
                })
              }
            />

            <button type="submit">Ingresar</button>
          </form>
        ) : (
          <form onSubmit={handleRegistro}>
            <h2>Crear Cuenta</h2>

            <input
              type="text"
              placeholder="Nombre"
              onChange={(e) =>
                setRegistro({
                  ...registro,
                  nombre: e.target.value,
                })
              }
            />

            <input
              type="email"
              placeholder="Correo electrónico"
              onChange={(e) =>
                setRegistro({
                  ...registro,
                  email: e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="Contraseña"
              onChange={(e) =>
                setRegistro({
                  ...registro,
                  password: e.target.value,
                })
              }
            />

            <button type="submit">Registrarse</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default MiPerfil;
