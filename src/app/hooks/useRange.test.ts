import { renderHook } from "@testing-library/react-hooks";
import useRange from "../hooks/useRange";
import {
  HandlePositions,
  MaxPositionParams,
  MinPositionParams,
} from "../interfaces/Range";
import { RefObject, act } from "react";

describe("Given a useRange hook", () => {
  describe("When handleMinPosition is called with its params", () => {
    test("Then it should update min position correctly", async () => {
      const setMinPosition = jest.fn();
      const setMin = jest.fn();

      const params: MinPositionParams = {
        setMinPosition,
        setMin,
        type: "fixed",
        currentPosition: 50,
        rangeValues: [0, 10, 20, 30, 40, 50],
        rangeWidth: 100,
        maxPosition: 90,
        max: 100,
      };

      const { result } = renderHook(() => useRange());

      await act(async () => {
        result.current.handleMinPosition(params);
      });

      expect(setMinPosition).toHaveBeenCalledWith(50);
      expect(setMin).toHaveBeenCalledWith(20);
    });
  });

  describe("When handleMaxPosition is called with its params", () => {
    test("Then it should update max position correctly", async () => {
      const setMaxPosition = jest.fn();
      const setMax = jest.fn();

      const params: MaxPositionParams = {
        min: 20,
        minPosition: 30,
        setMaxPosition,
        setMax,
        type: "fixed",
        currentPosition: 80,
        rangeValues: [0, 10, 20, 30, 40, 50],
        rangeWidth: 100,
      };

      const { result } = renderHook(() => useRange());

      await act(async () => {
        result.current.handleMaxPosition(params);
      });

      expect(setMaxPosition).toHaveBeenCalledWith(80);
      expect(setMax).toHaveBeenCalledWith(40);
    });
  });

  describe("When handleDrag is called with its params", () => {
    test("Then it should handle drag correctly", async () => {
      const setMinPosition = jest.fn();
      const setMin = jest.fn();
      const setMaxPosition = jest.fn();
      const setMax = jest.fn();

      const rangeRef = {
        current: {
          getBoundingClientRect: jest.fn().mockReturnValue({ left: 10 }),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
        },
      };

      const params: HandlePositions = {
        setMinPosition,
        setMin,
        setMaxPosition,
        setMax,
        type: "fixed",
        rangeValues: [0, 10, 20, 30, 40, 50],
        rangeWidth: 100,
        maxPosition: 90,
        max: 100,
        min: 20,
        minPosition: 30,
      };

      const { result } = renderHook(() => useRange());

      let position;
      await act(async () => {
        position = result.current.handleDrag(
          "min",
          { clientX: 60 } as MouseEvent,
          rangeRef as unknown as RefObject<HTMLDivElement>,
          params,
        );
      });

      expect(position).toBe(50);
      expect(setMinPosition).toHaveBeenCalledWith(50);
      expect(setMin).toHaveBeenCalledWith(20);
    });
  });

  describe("When handleKeyDownMin is called", () => {
    test("Then it should update max value correctly for fixed type when ArrowLeft is pressed", async () => {
      const setMin = jest.fn();
      const setMinPosition = jest.fn();

      const event = { key: "ArrowLeft" } as React.KeyboardEvent;

      const rangeValues = [0, 10, 20, 30, 40, 50];
      const type = "fixed";
      const min = 10;
      const max = 40;
      const rangeWidth = 100;

      const { result } = renderHook(() => useRange());

      await act(async () => {
        result.current.handleKeyDownMin(
          event,
          setMin,
          min,
          max,
          rangeValues,
          type,
          rangeWidth,
          setMinPosition,
        );
      });

      expect(setMin).toHaveBeenCalled();
    });

    test("Then it should update max value correctly for fixed type when ArrowRight is pressed", async () => {
      const setMin = jest.fn();
      const setMinPosition = jest.fn();

      const event = { key: "ArrowRight" } as React.KeyboardEvent;

      const rangeValues = [0, 10, 20, 30, 40, 50];
      const type = "fixed";
      const min = 10;
      const max = 40;
      const rangeWidth = 100;

      const { result } = renderHook(() => useRange());

      await act(async () => {
        result.current.handleKeyDownMin(
          event,
          setMin,
          min,
          max,
          rangeValues,
          type,
          rangeWidth,
          setMinPosition,
        );
      });

      expect(setMin).toHaveBeenCalled();
      expect(setMinPosition).toHaveBeenCalledWith(40);
    });

    test("Then it should update max value correctly for normal type when ArrowLeft is pressed", async () => {
      const setMax = jest.fn();
      const setMaxPosition = jest.fn();

      const event = { key: "ArrowLeft" } as React.KeyboardEvent;

      const rangeValues = [0, 10, 20, 30, 40, 50];
      const type = "normal";
      const min = 10;
      const max = 40;
      const rangeWidth = 100;

      const { result } = renderHook(() => useRange());

      await act(async () => {
        result.current.handleKeyDownMin(
          event,
          setMax,
          min,
          max,
          rangeValues,
          type,
          rangeWidth,
          setMaxPosition,
        );
      });

      expect(setMax).toHaveBeenCalled();
    });

    test("Then it should update max value correctly for normal type when ArrowLeft is pressed", async () => {
      const setMax = jest.fn();
      const setMaxPosition = jest.fn();

      const event = { key: "ArrowRight" } as React.KeyboardEvent;

      const rangeValues = [0, 10, 20, 30, 40, 50];
      const type = "normal";
      const min = 10;
      const max = 40;
      const rangeWidth = 100;

      const { result } = renderHook(() => useRange());

      await act(async () => {
        result.current.handleKeyDownMin(
          event,
          setMax,
          min,
          max,
          rangeValues,
          type,
          rangeWidth,
          setMaxPosition,
        );
      });

      expect(setMax).toHaveBeenCalled();
    });
  });

  describe("When handleKeyDownMax is called", () => {
    test("Then it should update max value correctly for fixed type when ArrowLeft is pressed", async () => {
      const setMax = jest.fn();
      const setMaxPosition = jest.fn();

      const event = { key: "ArrowLeft" } as React.KeyboardEvent;

      const rangeValues = [0, 10, 20, 30, 40, 50];
      const type = "fixed";
      const min = 10;
      const max = 40;
      const rangeWidth = 100;

      const { result } = renderHook(() => useRange());

      await act(async () => {
        result.current.handleKeyDownMax(
          event,
          setMax,
          min,
          max,
          rangeValues,
          type,
          rangeWidth,
          setMaxPosition,
        );
      });

      const expectedPosition = (30 / 50) * rangeWidth;

      expect(setMax).toHaveBeenCalledWith(30);
      expect(setMaxPosition).toHaveBeenCalledWith(expectedPosition);
    });

    test("Then it should update max value correctly for fixed type when ArrowRight is pressed", async () => {
      const setMax = jest.fn();
      const setMaxPosition = jest.fn();

      const event = { key: "ArrowRight" } as React.KeyboardEvent;

      const rangeValues = [0, 10, 20, 30, 40, 50];
      const type = "fixed";
      const min = 10;
      const max = 40;
      const rangeWidth = 100;

      const { result } = renderHook(() => useRange());

      await act(async () => {
        result.current.handleKeyDownMax(
          event,
          setMax,
          min,
          max,
          rangeValues,
          type,
          rangeWidth,
          setMaxPosition,
        );
      });

      const expectedPosition = (50 / 50) * rangeWidth;

      expect(setMax).toHaveBeenCalledWith(50);
      expect(setMaxPosition).toHaveBeenCalledWith(expectedPosition);
    });

    test("Then it should update max value correctly for normal type when ArrowLeft is pressed", async () => {
      const setMax = jest.fn();
      const setMaxPosition = jest.fn();

      const event = { key: "ArrowLeft" } as React.KeyboardEvent;

      const rangeValues = [0, 10, 20, 30, 40, 50];
      const type = "normal";
      const min = 10;
      const max = 40;
      const rangeWidth = 100;

      const { result } = renderHook(() => useRange());

      await act(async () => {
        result.current.handleKeyDownMax(
          event,
          setMax,
          min,
          max,
          rangeValues,
          type,
          rangeWidth,
          setMaxPosition,
        );
      });

      expect(setMax).toHaveBeenCalled();
    });

    test("Then it should update max value correctly for normal type when ArrowLeft is pressed", async () => {
      const setMax = jest.fn();
      const setMaxPosition = jest.fn();

      const event = { key: "ArrowRight" } as React.KeyboardEvent;

      const rangeValues = [0, 10, 20, 30, 40, 50];
      const type = "normal";
      const min = 10;
      const max = 40;
      const rangeWidth = 100;

      const { result } = renderHook(() => useRange());

      await act(async () => {
        result.current.handleKeyDownMax(
          event,
          setMax,
          min,
          max,
          rangeValues,
          type,
          rangeWidth,
          setMaxPosition,
        );
      });

      expect(setMax).toHaveBeenCalled();
    });
  });

  describe("When handleMinChange is called", () => {
    test("Then it should handle min value change and feedback", async () => {
      const setMin = jest.fn().mockResolvedValue(5);
      const setErrorFeedbackMax = jest.fn().mockResolvedValue(true);
      const setErrorFeedbackMin = jest.fn();

      const event = {
        target: { value: "50" },
      } as React.ChangeEvent<HTMLInputElement>;

      const { result } = renderHook(() => useRange());

      await act(async () => {
        result.current.handleMinChange(
          event,
          setMin,
          setErrorFeedbackMax,
          setErrorFeedbackMin,
        );
      });

      expect(setMin).toHaveBeenCalledWith(50);
    });

    test("Then it should handle errors when values are lower than 0 or greater than 100", async () => {
      const setMin = jest.fn().mockResolvedValue(5);
      const setErrorFeedbackMax = jest.fn();
      const setErrorFeedbackMin = jest.fn();

      const eventMin = {
        target: { value: "-1" },
      } as React.ChangeEvent<HTMLInputElement>;

      const eventMax = {
        target: { value: "200" },
      } as React.ChangeEvent<HTMLInputElement>;

      const { result } = renderHook(() => useRange());

      await act(async () => {
        result.current.handleMinChange(
          eventMin,
          setMin,
          setErrorFeedbackMax,
          setErrorFeedbackMin,
        );
      });

      await act(async () => {
        result.current.handleMinChange(
          eventMax,
          setMin,
          setErrorFeedbackMax,
          setErrorFeedbackMin,
        );
      });

      expect(setErrorFeedbackMin).toHaveBeenCalled();
      expect(setErrorFeedbackMax).toHaveBeenCalled();
    });
  });

  describe("When handleMaxChange is called", () => {
    test("Then it should handle max value change and feedback", async () => {
      const setMax = jest.fn();
      const setErrorFeedbackMax = jest.fn();
      const setErrorFeedbackMin = jest.fn();

      const event = {
        target: { value: "80" },
      } as React.ChangeEvent<HTMLInputElement>;

      const { result } = renderHook(() => useRange());

      await act(async () => {
        result.current.handleMaxChange(
          event,
          setMax,
          setErrorFeedbackMax,
          setErrorFeedbackMin,
        );
      });

      expect(setMax).toHaveBeenCalledWith(80);
    });

    test("Then it should handle errors when values are lower than 0 or greater than 100", async () => {
      const setMin = jest.fn().mockResolvedValue(5);
      const setErrorFeedbackMax = jest.fn();
      const setErrorFeedbackMin = jest.fn();

      const eventMin = {
        target: { value: "-1" },
      } as React.ChangeEvent<HTMLInputElement>;

      const eventMax = {
        target: { value: "200" },
      } as React.ChangeEvent<HTMLInputElement>;

      const { result } = renderHook(() => useRange());

      await act(async () => {
        result.current.handleMaxChange(
          eventMin,
          setMin,
          setErrorFeedbackMax,
          setErrorFeedbackMin,
        );
      });

      await act(async () => {
        result.current.handleMaxChange(
          eventMax,
          setMin,
          setErrorFeedbackMax,
          setErrorFeedbackMin,
        );
      });

      expect(setErrorFeedbackMin).toHaveBeenCalled();
      expect(setErrorFeedbackMax).toHaveBeenCalled();
    });
  });
});
