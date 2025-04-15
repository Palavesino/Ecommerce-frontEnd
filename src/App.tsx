// Importaciones de dependencias
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// Importaciones de componentes, funciones y modelos

// Importaciones de estilos
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Router from "./route/Route";
import NavBar from "./components/common/nav-bar/NavBar";
import Footer from "./components/common/footer/Footer";
import { SpinnerProvider } from "./context/SpinnerContext";
import SpinnerLoading from "./components/spinner-loading/SpinnerLoading";

function App() {
  // Renderizado del componente
  return (
    <>

      <BrowserRouter>
        <SpinnerProvider>
        {/* <CartProvider> */}
        <div className="root">
          <NavBar />
          <div className="main-container">
            <Router />
            <SpinnerLoading /> 
          </div>
          <Footer />
          <ToastContainer />
        </div>
        {/* </CartProvider> */}
        </SpinnerProvider>
      </BrowserRouter>
    </>
  );
}

export default App;