import { Route } from "react-router-dom";


// Importaciones de Assets
import { lazy, Suspense } from "react";

const Products = lazy(() => import('../components/product/Products'));
const ProductDetails = lazy(() => import('../components/product/product-details/ProductDetails'));
const CartTable = lazy(() => import('../components/page/Cart/CartTable'));
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
          <Route path="/carrito" element={ <CartTable/>}></Route>
        </RoutesWithNotFound>
      </Suspense>
    </>
  );
};

export default Router;