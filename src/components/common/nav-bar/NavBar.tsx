import { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { BsCart3 } from "react-icons/bs";
import { useCart } from "../../../context/CartContext";
import "./NavBar.css";
import CartSidebar from "../../page/Cart/CartSidebar";

const NavBar = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <>
      <Navbar expand="lg" className="main-navbar">
        <Container fluid className="navbar-inner">

          {/* Logo */}
          <Navbar.Brand href="/" className="nav-brand">
            <div className="logo-box">
              <span className="logo-initials">BS</span>
            </div>
            <div className="logo-text">
              <span className="logo-sub">Restaurante</span>
              <span className="logo-name">El Buen Sabor</span>
            </div>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll />
          </Navbar.Collapse>

          {/* Botón carrito */}
          <button
            className="cart-btn"
            onClick={() => setCartOpen(true)}
            aria-label="Abrir carrito"
          >
            <BsCart3 />
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </button>

        </Container>
      </Navbar>

      {/* Barra de beneficios */}
      <div className="hero-strip">
        <span>Envío gratis desde $5.000</span>
        <span className="strip-dot" />
        <span>Productos artesanales seleccionados</span>
        <span className="strip-dot" />
        <span>Pago seguro</span>
      </div>

      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default NavBar;