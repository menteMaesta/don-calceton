import React from "react";
import { render, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import SnackbarProvider from "react-simple-snackbar";
import RegisterAdmin from "src/routes/Login/RegisterAdmin";
import { ROUTES } from "src/helpers/constants";

describe("RegisterAdmin", () => {
  const routes = [
    {
      path: ROUTES.REGISTER_ADMIN,
      element: <RegisterAdmin />,
      action: () => [],
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: [ROUTES.REGISTER_ADMIN],
  });
  test("renders the registration form", async () => {
    const { getByText, getByLabelText } = render(
      <React.StrictMode>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </React.StrictMode>
    );

    const registerTitle = await waitFor(() => getByText("Registro"));
    const nameInput = getByLabelText("Nombre");
    const emailInput = getByLabelText("Correo");
    const passwordInput = getByLabelText("Contraseña");
    const saveButton = getByText("Guardar");

    expect(registerTitle).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });
});
