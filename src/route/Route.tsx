import { Route } from "react-router-dom";


// Importaciones de Assets
import { lazy, Suspense } from "react";

const Products = lazy(() => import('../components/product/Products'));
const ProductDetails = lazy(() => import('../components/product/product-details/ProductDetails'));
const Carrito = lazy(() => import('../components/page/cart/Cart'));
const RoutesWithNotFound = lazy(() => import('../util/routes-with-not-found'));


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
          <Route path="/carrito" element={<Carrito />}></Route>
        </RoutesWithNotFound>
      </Suspense>
    </>
  );
};

export default Router;