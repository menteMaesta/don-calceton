import React from "react";
import "tailwindcss/tailwind.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "helpers/constants";

import { loginActions } from "routes/Login/actions";
import Login from "routes/Login/Login";
import Register from "routes/Login/Register";
import ChangePassword from "routes/Login/ChangePassword";
import ForgotPassword from "routes/Login/ForgotPassword";
import GotoMail from "routes/Login/GoToMail";
import MainGuest from "routes/Login/MainGuest";

import { hasToken } from "routes/Dashboard/loader";
import Dashboard from "routes/Dashboard/Dashboard";

import ErrorPage from "./Error/Error";

import Products from "routes/Products/Products";
import { getProducts, getProduct } from "routes/Products/loader";

import NewProduct from "routes/Products/NewProduct";
import { productsActions } from "routes/Products/actions";
import ProductDetails from "routes/Products/Product";

import NewVariant from "routes/Variants/NewVariant";
import { variantActions } from "routes/Variants/actions";

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
      {
        path: ROUTES.NEW_VARIANT,
        element: <NewVariant />,
        action: variantActions,
      },
    ],
  },
  {
    element: <MainGuest />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <Login />,
        errorElement: <ErrorPage />,
        action: loginActions,
        index: true,
      },
      {
        path: ROUTES.REGISTER,
        element: <Register />,
        errorElement: <ErrorPage />,
        action: loginActions,
      },
      {
        path: ROUTES.FORGOT_PASSWORD,
        element: <ForgotPassword />,
        errorElement: <ErrorPage />,
        action: loginActions,
      },
      {
        path: ROUTES.CHANGE_PASSWORD,
        element: <ChangePassword />,
        errorElement: <ErrorPage />,
        action: loginActions,
      },
      {
        path: ROUTES.GO_TO_MAIL,
        element: <GotoMail />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
