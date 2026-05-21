import { Route } from "react-router-dom";


// Importaciones de Assets
import { lazy, Suspense } from "react";


const Products = lazy(() => import('../components/product/Products'));
const ProductDetails = lazy(() => import('../components/product/product-details/ProductDetails'));
const RoutesWithNotFound = lazy(() => import('../util/routes-with-not-found'));
const OrderSuccess = lazy(() => import('../components/order/Success'));
const OrderFailure = lazy(() => import('../components/order/Failure'));
const OrderPending = lazy(() => import('../components/order/Pending'));


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
          <Route path="/orden/success" element={<OrderSuccess />} />
          <Route path="/orden/failure" element={<OrderFailure />} />
          <Route path="/orden/pending" element={<OrderPending />} />
        </RoutesWithNotFound>
      </Suspense>
    </>
  );
};

export default Router;