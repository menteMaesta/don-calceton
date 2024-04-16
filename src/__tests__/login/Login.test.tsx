import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import SnackbarProvider from "react-simple-snackbar";
import Login from "routes/Login/Login";
import { ROUTES } from "helpers/constants";

describe("Login Component", () => {
  const routes = [
    {
      path: ROUTES.LOGIN,
      element: <Login />,
      action: () => [],
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: [ROUTES.LOGIN],
  });

  test("renders login form", async () => {
    const { getByText, getByLabelText } = render(
      <React.StrictMode>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </React.StrictMode>
    );

    const donCalcetonLabel = await waitFor(() => getByText("Don Calcetón"));
    const emailInput = getByLabelText("Correo");
    const passwordInput = getByLabelText("Contraseña");
    const forgotPasswordLink = getByText("olvidaste tu contraseña?");
    const loginButton = getByText("Entrar");

    expect(donCalcetonLabel).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(forgotPasswordLink).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test("updates email input value", () => {
    const { getByLabelText } = render(
      <React.StrictMode>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </React.StrictMode>
    );

    const emailInput = getByLabelText("Correo") as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput.value).toBe("test@example.com");
  });

  test("updates password input value", () => {
    const { getByLabelText } = render(
      <React.StrictMode>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </React.StrictMode>
    );

    const passwordInput = getByLabelText("Contraseña") as HTMLInputElement;

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(passwordInput.value).toBe("password123");
  });
});
