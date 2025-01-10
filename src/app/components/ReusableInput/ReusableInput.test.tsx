import { render, fireEvent, screen } from "@testing-library/react";
import ReusbaleInput from "./ReusableInput";

const mockOnChange = jest.fn();

describe("Given a ReusableInput component", () => {
  describe("When it is rendered & the type is min", () => {
    test("Then it should render with a min value", () => {
      render(<ReusbaleInput value={10} onChange={mockOnChange} type="min" />);

      const minValueInput = screen.getByLabelText("min input");

      fireEvent.change(minValueInput, { target: { value: 10 } });

      expect(minValueInput).toHaveValue(10);
    });

    describe("When it is rendered & the type is max", () => {
      test("Then it should render with a max value", () => {
        render(
          <ReusbaleInput value={100} onChange={mockOnChange} type="max" />,
        );

        const maxValueInput = screen.getByLabelText("max input");

        fireEvent.change(maxValueInput, { target: { value: 100 } });

        expect(maxValueInput).toHaveValue(100);
      });
    });
  });
});
