import React from "react";
import { render, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import SnackbarProvider from "react-simple-snackbar";
import ForgotPassword from "routes/Login/ForgotPassword";
import { ROUTES } from "helpers/constants";
import { AUTH_SELECTORS } from "helpers/test";
import { es } from "helpers/strings";

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
      getByTestId(AUTH_SELECTORS.forgotPassword)
    );
    const forgotPasswordTitle = getByTestId(AUTH_SELECTORS.forgotTitle);
    const forgotPasswordDescription = getByTestId(
      AUTH_SELECTORS.forgotDescription
    );
    const emailInput = getByLabelText(es.login.email);
    const sendButton = getByTestId(AUTH_SELECTORS.forgotSubmit);

    expect(forgotPasswordComponent).toBeInTheDocument();
    expect(forgotPasswordTitle).toBeInTheDocument();
    expect(forgotPasswordTitle).toHaveTextContent(
      es.changePassword.forgotPassword
    );
    expect(forgotPasswordTitle).toHaveClass(
      "text-2xl",
      "font-bold",
      "text-slate-600"
    );
    expect(forgotPasswordDescription).toBeInTheDocument();
    expect(forgotPasswordDescription).toHaveTextContent(
      es.changePassword.writeEmail
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
