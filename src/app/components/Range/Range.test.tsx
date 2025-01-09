import { render, fireEvent, screen } from "@testing-library/react";
import Range from "./Range";

describe("Given a Range component", () => {
  describe("When it is rendered", () => {
    test("Then it should render with initial min and max values", () => {
      render(<Range type="normal" minValue={10} maxValue={90} />);

      const minValueInput = screen.getByLabelText("min input");
      const maxValueInput = screen.getByLabelText("max input");

      fireEvent.change(minValueInput, { target: { value: 1 } });
      fireEvent.change(maxValueInput, { target: { value: 100 } });

      expect(minValueInput).toHaveValue(1);

      expect(maxValueInput).toHaveValue(100);
    });

    test("Then it should update min and max values on drag", () => {
      render(<Range type="normal" minValue={10} maxValue={90} />);

      const minHandle = screen.getAllByRole("button")[0];
      fireEvent.mouseDown(minHandle);

      fireEvent.mouseMove(document, { clientX: 50 });
      fireEvent.mouseUp(document);

      const minValueInput = screen.getByLabelText("min input");

      fireEvent.change(minValueInput, { target: { value: 17 } });

      expect(minValueInput).toHaveValue(17);
    });

    test("Then it should update min and max values with 'fixed' rangeValues", () => {
      const rangeValues = [10, 20, 30, 40, 50];
      render(<Range type="fixed" rangeValues={rangeValues} />);

      const minValue = screen.getByText("10");
      const maxValue = screen.getByText("50");

      expect(minValue).toBeInTheDocument();
      expect(maxValue).toBeInTheDocument();
    });

    test("Then it should update max value on drag", () => {
      render(<Range type="normal" minValue={10} maxValue={90} />);

      const maxHandle = screen.getAllByRole("button")[1];
      fireEvent.mouseDown(maxHandle);

      fireEvent.mouseMove(document, { clientX: 250 });
      fireEvent.mouseUp(document);

      const maxValueInput = screen.getByLabelText("max input");

      fireEvent.change(maxValueInput, { target: { value: 83 } });

      expect(maxValueInput).toHaveValue(83);
    });
  });
});
