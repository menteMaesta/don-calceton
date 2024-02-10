import React from "react";
import "tailwindcss/tailwind.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "helpers/constants";
import { handleLogin } from "routes/Login/actions";
import { hasToken } from "routes/Dashboard/loader";
import ErrorPage from "./Error/Error";
import Login from "routes/Login/Login";
import Dashboard from "routes/Dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: ROUTES.DASHBOARD,
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    loader: hasToken,
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
