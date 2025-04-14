import { Route } from "react-router-dom";


// Importaciones de Assets
import { Suspense, lazy } from "react";
import RoutesWithNotFound from "../util/routes-with-not-found";


 const Products = lazy(() => import('../components/product/Products'));




const Router = () => {
  return (
    <>
      <Suspense fallback={<h1>Loding...</h1>}>
        <RoutesWithNotFound>

          <Route path="/" element={
               <Products />
           } />
          
        </RoutesWithNotFound>
      </Suspense>
    </>
  );
};

export default Router;