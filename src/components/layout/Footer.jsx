import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <h3>bucle</h3>
            <p>
              Plataforma de economía circular y voluntariado. Cada acción
              cuenta.
            </p>
          </div>

          <div className="footer-col">
            <h5>Plataforma</h5>
            <a href="#">Cómo funciona</a>
            <a href="#">Tienda</a>
            <a href="#">Voluntariado</a>
            <a href="#">Puntos verdes</a>
          </div>

          <div className="footer-col">
            <h5>Comunidad</h5>
            <a href="#">Blog</a>
            <a href="#">Embajadores</a>
            <a href="#">Empresas adheridas</a>
            <a href="#">Prensa</a>
          </div>

          <div className="footer-col">
            <h5>Soporte</h5>
            <a href="#">Preguntas frecuentes</a>
            <a href="#">Contacto</a>
            <a href="#">Privacidad</a>
            <a href="#">Términos</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © 2026 Bucle — Plataforma de economía circular y voluntariado
          </span>
          <div className="footer-links">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
            <a href="https://wa.me" target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
