import { render, screen } from "@testing-library/react";
import { navbarSections } from "./utils/navbarSections";
import Navbar from "./Navbar";

describe("Given a Navbar component", () => {
  describe("When it is rendered", () => {
    test("Then it should render all the navbar sections correctly", () => {
      render(<Navbar />);

      navbarSections.forEach((section) => {
        const linkElement = screen.getByText(section.name);
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute("href", section.link);
      });
    });
  });
});
