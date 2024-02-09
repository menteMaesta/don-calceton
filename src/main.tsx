import React from "react";
import "tailwindcss/tailwind.css";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { store } from "./app/store";
import ErrorPage from "./error/Error";
import Login from "./Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        Main <Outlet />
      </div>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        element: <div>Dashboard</div>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
