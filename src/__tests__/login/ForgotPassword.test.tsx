import React from "react";
import { render, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import SnackbarProvider from "react-simple-snackbar";
import ForgotPassword from "routes/Login/ForgotPassword";
import { ROUTES } from "helpers/constants";

describe("ForgotPassword", () => {
  test.only("renders the ForgotPassword component", async () => {
    const routes = [
      {
        path: ROUTES.FORGOT_PASSWORD,
        element: <ForgotPassword />,
        action: () => [],
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: [ROUTES.FORGOT_PASSWORD],
    });

    const { getByTestId, getByLabelText } = render(
      <React.StrictMode>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </React.StrictMode>
    );

    const forgotPasswordComponent = await waitFor(() =>
      getByTestId("forgot-password-component")
    );
    const forgotPasswordTitle = getByTestId("forgot-password_title");
    const forgotPasswordDescription = getByTestId(
      "forgot-password_description"
    );
    const emailInput = getByLabelText("Correo");
    const sendButton = getByTestId("forgot-password_submit");

    expect(forgotPasswordComponent).toBeInTheDocument();
    expect(forgotPasswordTitle).toBeInTheDocument();
    expect(forgotPasswordTitle).toHaveTextContent("Olvidaste tu contraseña?");
    expect(forgotPasswordTitle).toHaveClass(
      "text-2xl",
      "font-bold",
      "text-slate-600"
    );
    expect(forgotPasswordDescription).toBeInTheDocument();
    expect(forgotPasswordDescription).toHaveTextContent(
      "Escribe aquí tu correo y enviaremos un mensaje de actualización"
    );
    expect(forgotPasswordDescription).toHaveClass(
      "text-sm text-slate-600",
      "w-4/5 sm:w-full",
      "sm:text-center pt-2"
    );
    expect(emailInput).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();
  });
});
