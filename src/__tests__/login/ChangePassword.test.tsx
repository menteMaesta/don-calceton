import React from "react";
import { render, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import SnackbarProvider from "react-simple-snackbar";
import ChangePassword from "routes/Login/ChangePassword";
import { ROUTES } from "helpers/constants";
import { AUTH_SELECTORS } from "helpers/test";
import { es } from "helpers/strings";

describe("ChangePassword", () => {
  test("renders without error", async () => {
    const routes = [
      {
        path: ROUTES.CHANGE_PASSWORD,
        element: <ChangePassword />,
        action: () => [],
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: [ROUTES.CHANGE_PASSWORD],
    });

    const { getByTestId } = render(
      <React.StrictMode>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </React.StrictMode>
    );

    const changePasswordComponent = await waitFor(() =>
      getByTestId("change-password_component")
    );
    const changePasswordTitle = getByTestId(AUTH_SELECTORS.changeTitle);
    const changePasswordInput = getByTestId(AUTH_SELECTORS.passwordInput);
    const changePasswordConfirmInput = getByTestId(
      AUTH_SELECTORS.passwordConfirmInput
    );
    const changePasswordButton = getByTestId(AUTH_SELECTORS.changeSubmit);

    expect(changePasswordComponent).toBeInTheDocument();
    expect(changePasswordTitle).toBeInTheDocument();
    expect(changePasswordTitle).toHaveTextContent(es.changePassword.name);
    expect(changePasswordTitle).toHaveClass(
      "text-3xl font-bold text-slate-600"
    );
    expect(changePasswordInput).toBeInTheDocument();
    expect(changePasswordConfirmInput).toBeInTheDocument();
    expect(changePasswordButton).toBeInTheDocument();
  });
});
