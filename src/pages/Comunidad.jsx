import Canastas from "../components/Canastas";
import "./Comunidad.css";

function Comunidad() {
  return (
    <div>
      <div className="divprincipal">
        <div className="divizquierda">
          <h1 className="titulo-up">
            Comunidad <em>Bucle</em>
          </h1>
          
          <h2 className="subtitulo-comunidad">
            Reciclar es más fácil y divertido en comunidad
          </h2>
          
          <p className="descripcion-comunidad">
            Comunícate, organízate y haz amigos mientras ayudas a resolver 
            un problema real del medio ambiente.
          </p>

          <div className="botones-comunidad">
            <button className="btn-comunidad-main">
              Realizar un posteo en la comunidad
            </button>
            <button className="btn-comunidad-sec">
              Ver posteos de la comunidad
            </button>
          </div>
        </div>
        <div className="divderecha">
        </div>
      </div>

      <Canastas />
    </div>
  );
}

export default Comunidad;