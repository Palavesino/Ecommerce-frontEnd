import { Route } from "react-router-dom";
//import Carrito from "../components/page/cart/Cart.tsx";


// Importaciones de Assets
import { lazy, Suspense } from "react";

const Products = lazy(() => import('../components/product/Products.tsx'));
const ProductDetails = lazy(() => import('../components/product/product-details/ProductDetails.tsx'));
//const Carrito = lazy(() => import('../components/page/cart/Cart.tsx'));
const RoutesWithNotFound = lazy(() => import('../util/routes-with-not-found.tsx'));


const Router = () => {
  return (
    <>
      <Suspense fallback={<h1>Loding...</h1>}>
        <RoutesWithNotFound>

          <Route path="/" element={
               <Products />
           } />
           <Route
            path="/productos/:productId"
            element={<ProductDetails />}
          />
          {/* <Route path="/carrito" element={<Carrito />}></Route> */}
        </RoutesWithNotFound>
      </Suspense>
    </>
  );
};

export default Router;