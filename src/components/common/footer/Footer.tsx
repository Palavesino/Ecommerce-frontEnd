import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner">

        {/* Fila principal */}
        <div className="footer-main">

          {/* Logo + descripción */}
          <div className="footer-brand">
            <div className="footer-logo-box">
              <span className="footer-logo-initials">BS</span>
            </div>
            <div className="footer-brand-text">
              <span className="footer-brand-sub">Restaurante</span>
              <span className="footer-brand-name">El Buen Sabor</span>
            </div>
          </div>

          {/* Links */}
          <div className="footer-links">
            <p className="footer-links-title">Menú</p>
            <a href="/">Inicio</a>
            <a href="/">Platos principales</a>
            <a href="/">Bebidas</a>
            <a href="/">Postres</a>
          </div>

          <div className="footer-links">
            <p className="footer-links-title">Información</p>
            <a href="#">Sobre nosotros</a>
            <a href="#">Contacto</a>
            <a href="#">Términos y condiciones</a>
          </div>

          {/* Redes */}
          <div className="footer-social">
            <p className="footer-links-title">Seguinos</p>
            <div className="footer-social-icons">
              <a href="#" className="footer-icon-btn" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" className="footer-icon-btn" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="footer-icon-btn" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Fila inferior */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © 2025 El Buen Sabor · Todos los derechos reservados
          </p>
          <p className="footer-dev">
            Desarrollado por <span>Power Rangers</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;