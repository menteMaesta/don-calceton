import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import GoToMail from "routes/Login/GoToMail";
import { ROUTES } from "helpers/constants";

describe("GoToMail", () => {
  test("renders a link to the mail page", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <GoToMail />
      </BrowserRouter>
    );

    const toMailTitle = getByTestId("to-mail_title");
    const toMailDescription = getByTestId("to-mail_description");
    const linkElement = getByTestId("to-mail_link");

    expect(toMailTitle).toBeInTheDocument();
    expect(toMailTitle).toHaveTextContent("Listo!");
    expect(toMailTitle).toHaveClass("text-2xl font-bold text-slate-600");
    expect(toMailDescription).toBeInTheDocument();
    expect(toMailDescription).toHaveTextContent(
      "En tu bandeja de correo te dejamos las instrucciones para restablecer tu contraseña"
    );
    expect(toMailDescription).toHaveClass(
      "text-sm text-slate-600",
      "w-4/5 sm:w-full",
      "text-center pt-2"
    );
    expect(linkElement).toHaveAttribute("href", ROUTES.LOGIN);
  });
});
