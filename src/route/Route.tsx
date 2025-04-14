import { Route } from "react-router-dom";


// Importaciones de Assets
import { Suspense } from "react";
import RoutesWithNotFound from "../util/routes-with-not-found";
import Products from "../components/product/Products";




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