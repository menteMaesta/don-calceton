import React from "react";
import { render, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import SnackbarProvider from "react-simple-snackbar";
import Register from "src/routes/Login/Register";
// import { ROUTES } from "src/helpers/constants";

describe.skip("Register component", () => {
  test("renders register form", async () => {
    const routes = [
      {
        // path: ROUTES.REGISTER,
        element: <Register />,
        action: () => [],
      },
    ];

    const router = createMemoryRouter(routes, {
      // initialEntries: [ROUTES.REGISTER],
    });

    const { getByLabelText, getByText } = render(
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
