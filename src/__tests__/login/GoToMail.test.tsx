import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import GoToMail from "routes/Login/GoToMail";
import { ROUTES } from "helpers/constants";
import { AUTH_SELECTORS } from "helpers/test";
import { es } from "helpers/strings";

describe("GoToMail", () => {
  test("renders a link to the mail page", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <GoToMail />
      </BrowserRouter>
    );

    const toMailTitle = getByTestId(AUTH_SELECTORS.toMailTitle);
    const toMailDescription = getByTestId(AUTH_SELECTORS.toMailDescription);
    const linkElement = getByTestId(AUTH_SELECTORS.toMailLink);

    expect(toMailTitle).toBeInTheDocument();
    expect(toMailTitle).toHaveTextContent(es.goToMail.title);
    expect(toMailTitle).toHaveClass("text-2xl font-bold text-slate-600");
    expect(toMailDescription).toBeInTheDocument();
    expect(toMailDescription).toHaveTextContent(es.goToMail.description);
    expect(toMailDescription).toHaveClass(
      "text-sm text-slate-600",
      "w-4/5 sm:w-full",
      "text-center pt-2"
    );
    expect(linkElement).toHaveAttribute("href", ROUTES.LOGIN);
  });
});
