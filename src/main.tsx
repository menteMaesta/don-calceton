import React, { lazy } from "react";
import SnackbarProvider from "react-simple-snackbar";
import "src/index.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "helpers/constants";
import { openDatabase } from "helpers/db";

import { loginActions } from "routes/Login/actions";
import { hasToken } from "routes/Dashboard/loader";
import ErrorPage from "./Error/Error";
import { getProducts, getProduct } from "routes/Products/loader";
import { productsActions } from "routes/Products/actions";
import { variantActions } from "routes/Variants/actions";
import { fetchVariant } from "routes/Variants/loader";
import { getCustomizations } from "routes/Customizations/loader";
import { customizationActions } from "routes/Customizations/actions";
import {
  fetchStorefrontData,
  getCartItems,
  getAllCartItems,
} from "routes/Store/VariantList/loader";
import { storeActions } from "routes/Store/VariantList/actions";
import SuspenseWrapper from "components/SuspenseWapper";

openDatabase()
  .then(() => {
    const Dashboard = lazy(() => import("routes/Dashboard/Dashboard"));
    const Products = lazy(() => import("routes/Products/Products"));
    const NewProduct = lazy(() => import("routes/Products/NewProduct"));
    const ProductDetails = lazy(() => import("routes/Products/Product"));
    const Customizations = lazy(
      () => import("routes/Customizations/Customizations")
    );
    const EditProduct = lazy(() => import("routes/Products/EditProduct"));
    const NewVariant = lazy(() => import("routes/Variants/NewVariant"));
    const Varaint = lazy(() => import("routes/Variants/Variant"));

    const MainGuest = lazy(() => import("routes/Login/MainGuest"));
    const Login = lazy(() => import("routes/Login/Login"));
    // const Register = lazy(() => import("routes/Login/Register"));
    // const RegisterAdmin = lazy(() => import("routes/Login/RegisterAdmin"));
    const ChangePassword = lazy(() => import("routes/Login/ChangePassword"));
    const ForgotPassword = lazy(() => import("routes/Login/ForgotPassword"));
    const GotoMail = lazy(() => import("routes/Login/GoToMail"));

    const Store = lazy(() => import("routes/Store/Store"));
    const VariantList = lazy(
      () => import("routes/Store/VariantList/VariantList")
    );
    const Cart = lazy(() => import("routes/Store/Cart/Cart"));

    const router = createBrowserRouter([
      {
        path: ROUTES.DASHBOARD,
        element: (
          <SuspenseWrapper>
            <Dashboard />
          </SuspenseWrapper>
        ),
        errorElement: <ErrorPage />,
        loader: hasToken,
        children: [
          {
            path: ROUTES.DASHBOARD,
            element: (
              <SuspenseWrapper>
                <Products />
              </SuspenseWrapper>
            ),
            loader: getProducts,
            action: productsActions,
            children: [
              {
                path: `${ROUTES.DASHBOARD}${ROUTES.ORDERS}`,
                element: <div>Orders</div>,
              },
            ],
          },
          {
            path: ROUTES.NEW_PRODUCT,
            element: (
              <SuspenseWrapper>
                <NewProduct />
              </SuspenseWrapper>
            ),
            action: productsActions,
          },
          {
            path: ROUTES.PRODUCT,
            loader: getProduct,
            action: productsActions,
            element: (
              <SuspenseWrapper>
                <ProductDetails />
              </SuspenseWrapper>
            ),
            children: [
              {
                path: `${ROUTES.PRODUCT}${ROUTES.CUSTOMIZATIONS}`,
                element: (
                  <SuspenseWrapper loaderClassName="!h-64">
                    <Customizations />
                  </SuspenseWrapper>
                ),
                loader: getCustomizations,
                action: customizationActions,
              },
            ],
          },
          {
            path: ROUTES.EDIT_PRODUCT,
            loader: getProduct,
            action: productsActions,
            element: (
              <SuspenseWrapper>
                <EditProduct />
              </SuspenseWrapper>
            ),
          },
          {
            path: ROUTES.NEW_VARIANT,
            element: (
              <SuspenseWrapper>
                <NewVariant />
              </SuspenseWrapper>
            ),
            action: variantActions,
          },
          {
            path: `${ROUTES.PRODUCT}${ROUTES.VARIANT}`,
            element: (
              <SuspenseWrapper>
                <Varaint />
              </SuspenseWrapper>
            ),
            loader: fetchVariant,
            action: variantActions,
          },
        ],
      },
      {
        element: (
          <SuspenseWrapper>
            <MainGuest />
          </SuspenseWrapper>
        ),
        errorElement: <ErrorPage />,
        children: [
          {
            path: ROUTES.LOGIN,
            element: (
              <SuspenseWrapper>
                <Login />
              </SuspenseWrapper>
            ),
            errorElement: <ErrorPage />,
            action: loginActions,
            index: true,
          },
          // {
          //   path: ROUTES.REGISTER,
          //   element: (
          //     <SuspenseWrapper>
          //       <Register />
          //     </SuspenseWrapper>
          //   ),
          //   errorElement: <ErrorPage />,
          //   action: loginActions,
          // },
          // {
          //   path: ROUTES.REGISTER_ADMIN,
          //   element: (
          //     <SuspenseWrapper>
          //       <RegisterAdmin />
          //     </SuspenseWrapper>
          //   ),
          //   errorElement: <ErrorPage />,
          //   action: loginActions,
          // },
          {
            path: ROUTES.FORGOT_PASSWORD,
            element: (
              <SuspenseWrapper>
                <ForgotPassword />
              </SuspenseWrapper>
            ),
            errorElement: <ErrorPage />,
            action: loginActions,
          },
          {
            path: ROUTES.CHANGE_PASSWORD,
            element: (
              <SuspenseWrapper>
                <ChangePassword />
              </SuspenseWrapper>
            ),
            errorElement: <ErrorPage />,
            action: loginActions,
          },
          {
            path: ROUTES.GO_TO_MAIL,
            element: (
              <SuspenseWrapper>
                <GotoMail />
              </SuspenseWrapper>
            ),
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        path: ROUTES.STORE,
        element: (
          <SuspenseWrapper>
            <Store />
          </SuspenseWrapper>
        ),
        errorElement: <ErrorPage />,
        loader: getCartItems,
        children: [
          {
            index: true,
            element: (
              <SuspenseWrapper>
                <VariantList />
              </SuspenseWrapper>
            ),
            loader: fetchStorefrontData,
            action: storeActions,
          },
          {
            path: ROUTES.CART,
            element: (
              <SuspenseWrapper>
                <Cart />
              </SuspenseWrapper>
            ),
            loader: getAllCartItems,
            action: storeActions,
          },
        ],
      },
    ]);

    ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </React.StrictMode>
    );
  })
  .catch((error) => {
    console.error("Error opening database", error);
  });
