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
import { getProducts } from "routes/Products/loader";

const router = createBrowserRouter([
  {
    path: ROUTES.DASHBOARD,
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    loader: hasToken,
    children: [
      { path: ROUTES.PRODUCTS, element: <Products />, loader: getProducts },
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
