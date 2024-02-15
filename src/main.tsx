import React from "react";
import "tailwindcss/tailwind.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "helpers/constants";

import { handleLogin } from "routes/Login/actions";
import Login from "routes/Login/Login";

import { hasToken } from "routes/Dashboard/loader";
import Dashboard from "routes/Dashboard/Dashboard";

import ErrorPage from "./Error/Error";

import Products from "routes/Products/Products";
import { getProducts, getProduct } from "routes/Products/loader";

import NewProduct from "routes/Products/NewProduct";
import { productsActions } from "routes/Products/actions";
import ProductDetails from "routes/Products/Product";

import NewVariant from "routes/Variants/NewVariant";

const router = createBrowserRouter([
  {
    path: ROUTES.DASHBOARD,
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    loader: hasToken,
    children: [
      {
        index: true,
        element: <Products />,
        loader: getProducts,
      },
      {
        path: ROUTES.NEW_PRODUCT,
        element: <NewProduct />,
        action: productsActions,
      },
      {
        path: ROUTES.PRODUCT,
        loader: getProduct,
        element: <ProductDetails />,
      },
      { path: ROUTES.NEW_VARIANT, element: <NewVariant /> },
    ],
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
    errorElement: <ErrorPage />,
    action: handleLogin,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
