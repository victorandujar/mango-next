import { renderHook, act } from "@testing-library/react-hooks";
import useRange from "../hooks/useRange";
import {
  HandlePositions,
  MaxPositionParams,
  MinPositionParams,
} from "../interfaces/Range";
import { RefObject } from "react";

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

      const {
        result: {
          current: { handleMinPosition },
        },
      } = renderHook(() => useRange());

      handleMinPosition(params);

      await act(() => {
        expect(setMinPosition).toHaveBeenCalledWith(50);
        expect(setMin).toHaveBeenCalledWith(20);
      });
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

      const {
        result: {
          current: { handleMaxPosition },
        },
      } = renderHook(() => useRange());

      handleMaxPosition(params);

      await act(() => {
        expect(setMaxPosition).toHaveBeenCalledWith(80);
        expect(setMax).toHaveBeenCalledWith(40);
      });
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

      const {
        result: {
          current: { handleDrag },
        },
      } = renderHook(() => useRange());

      let position;
      await act(async () => {
        position = handleDrag(
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
});
