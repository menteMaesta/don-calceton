import React from "react";
import { render, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import SnackbarProvider from "react-simple-snackbar";
import ChangePassword from "routes/Login/ChangePassword";
import { ROUTES } from "helpers/constants";

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
    const changePasswordTitle = getByTestId("change-password_title");
    const changePasswordInput = getByTestId("change-password_input");
    const changePasswordConfirmInput = getByTestId(
      "change-password_confirm_input"
    );
    const changePasswordButton = getByTestId("change-password_submit");

    expect(changePasswordComponent).toBeInTheDocument();
    expect(changePasswordTitle).toBeInTheDocument();
    expect(changePasswordTitle).toHaveTextContent("Cambio de contraseña");
    expect(changePasswordTitle).toHaveClass(
      "text-3xl font-bold text-slate-600"
    );
    expect(changePasswordInput).toBeInTheDocument();
    expect(changePasswordConfirmInput).toBeInTheDocument();
    expect(changePasswordButton).toBeInTheDocument();
  });
});
