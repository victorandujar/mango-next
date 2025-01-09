import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Given a Header component", () => {
  describe("When it is rendered", () => {
    test("Then it should show an image with the company logo", () => {
      render(<Header />);

      const image = screen.getByRole("img");

      expect(image).toBeInTheDocument();
    });
  });
});
