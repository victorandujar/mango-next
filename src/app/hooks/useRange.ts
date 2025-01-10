import { useCallback } from "react";
import {
  HandlePositions,
  MaxPositionParams,
  MinPositionParams,
} from "../interfaces/Range";

const useRange = () => {
  const handleMinPosition = useCallback(
    ({
      setMinPosition,
      setMin,
      type,
      currentPosition,
      rangeValues,
      rangeWidth,
      maxPosition,
      max,
    }: MinPositionParams) => {
      const newPosition = Math.max(
        0,
        Math.min(currentPosition, maxPosition - 10),
      );
      setMinPosition(newPosition);

      if (type === "fixed" && rangeValues.length > 0) {
        const newMin =
          rangeValues[
            Math.floor((newPosition / rangeWidth) * (rangeValues.length - 1))
          ];
        setMin(newMin);
      } else {
        const newMin = Math.min(
          Math.max(1, (newPosition / rangeWidth) * 100),
          max,
        );
        setMin(newMin);
      }

      return newPosition;
    },
    [],
  );

  const handleMaxPosition = useCallback(
    ({
      min,
      minPosition,
      setMax,
      setMaxPosition,
      type,
      currentPosition,
      rangeValues,
      rangeWidth,
    }: MaxPositionParams) => {
      const newPosition = Math.max(
        minPosition + 10,
        Math.min(currentPosition, rangeWidth),
      );
      setMaxPosition(newPosition);

      if (type === "fixed" && rangeValues.length > 0) {
        const newMax =
          rangeValues[
            Math.floor((newPosition / rangeWidth) * (rangeValues.length - 1))
          ];
        setMax(newMax);
      } else {
        const newMax = Math.max(
          Math.min(100, (newPosition / rangeWidth) * 100),
          min,
        );
        setMax(newMax);
      }

      return newPosition;
    },
    [],
  );

  const handleDrag = useCallback(
    (
      handleType: "min" | "max",
      event: MouseEvent,
      rangeRef: React.RefObject<HTMLDivElement>,
      {
        setMinPosition,
        setMin,
        type,
        rangeValues,
        rangeWidth,
        maxPosition,
        max,
        min,
        minPosition,
        setMax,
        setMaxPosition,
      }: HandlePositions,
    ) => {
      if (!rangeRef.current) return;

      const rangeLeft = rangeRef.current.getBoundingClientRect().left;
      const position = event.clientX - rangeLeft;

      if (handleType === "min") {
        handleMinPosition({
          setMinPosition,
          setMin,
          type,
          currentPosition: position,
          rangeValues,
          rangeWidth,
          maxPosition,
          max,
        });
      }

      if (handleType === "max") {
        handleMaxPosition({
          min,
          minPosition,
          currentPosition: position,
          rangeValues,
          setMax,
          setMaxPosition,
          type,
          rangeWidth,
        });
      }

      return position;
    },
    [handleMinPosition, handleMaxPosition],
  );

  const handleMouseMove = useCallback(
    (
      event: MouseEvent | TouchEvent,
      valueType: "min" | "max",
      rangeRef: React.RefObject<HTMLDivElement>,
      {
        setMinPosition,
        setMin,
        type,
        rangeValues,
        rangeWidth,
        maxPosition,
        max,
        min,
        minPosition,
        setMax,
        setMaxPosition,
      }: HandlePositions,
    ) => {
      if (valueType) {
        if (event instanceof MouseEvent) {
          handleDrag(valueType, event, rangeRef, {
            setMax,
            setMaxPosition,
            setMin,
            type,
            rangeValues,
            rangeWidth,
            maxPosition,
            max,
            min,
            minPosition,
            setMinPosition,
          });
        } else if (event instanceof TouchEvent) {
          const touch = event.touches[0];
          if (touch) {
            const fakeEvent: MouseEvent = new MouseEvent(event.type, {
              clientX: touch.clientX,
              clientY: touch.clientY,
              button: 0,
            });
            handleDrag(valueType, fakeEvent, rangeRef, {
              setMax,
              setMaxPosition,
              setMin,
              type,
              rangeValues,
              rangeWidth,
              maxPosition,
              max,
              min,
              minPosition,
              setMinPosition,
            });
          }
        }
      }
    },
    [handleDrag],
  );

  const handleKeyDownMin = (
    event: React.KeyboardEvent,
    setMin: React.Dispatch<React.SetStateAction<number>>,
    min: number,
    max: number,
    rangeValues: number[],
    type: "normal" | "fixed",
    rangeWidth: number,
    setMinPosition: (value: number) => void,
  ) => {
    if (type === "fixed") {
      const currentIndex = rangeValues.indexOf(min);
      const step = 1;

      if (event.key === "ArrowLeft" && currentIndex > 0) {
        const newMin = rangeValues[currentIndex - step];
        setMin(newMin);
        const newPosition =
          (newMin / rangeValues[rangeValues.length - 1]) * rangeWidth;
        setMinPosition(newPosition);
      } else if (
        event.key === "ArrowRight" &&
        currentIndex < rangeValues.length - 1
      ) {
        const newMin = rangeValues[currentIndex + step];
        setMin(newMin);
        const newPosition =
          (newMin / rangeValues[rangeValues.length - 1]) * rangeWidth;
        setMinPosition(newPosition);
      }
    } else if (type === "normal") {
      if (event.key === "ArrowLeft") {
        setMin((prevMin) => Math.max(prevMin - 1, 0));
      } else if (event.key === "ArrowRight") {
        setMin((prevMin) => Math.min(prevMin + 1, max - 1));
      }
    }
  };

  const handleKeyDownMax = (
    event: React.KeyboardEvent,
    setMax: React.Dispatch<React.SetStateAction<number>>,
    min: number,
    max: number,
    rangeValues: number[],
    type: "normal" | "fixed",
    rangeWidth: number,
    setMaxPosition: (value: number) => void,
  ) => {
    if (type === "fixed") {
      const currentIndex = rangeValues.indexOf(max);
      const step = 1;

      if (event.key === "ArrowLeft" && currentIndex > 0) {
        const newMax = rangeValues[currentIndex - step];
        setMax(newMax);
        const newPosition =
          (newMax / rangeValues[rangeValues.length - 1]) * rangeWidth;
        setMaxPosition(newPosition);
      } else if (
        event.key === "ArrowRight" &&
        currentIndex < rangeValues.length - 1
      ) {
        const newMax = rangeValues[currentIndex + step];
        setMax(newMax);
        const newPosition =
          (newMax / rangeValues[rangeValues.length - 1]) * rangeWidth;
        setMaxPosition(newPosition);
      }
    } else if (type === "normal") {
      if (event.key === "ArrowLeft") {
        setMax((prevMax) => Math.max(prevMax - 1, min + 1));
      } else if (event.key === "ArrowRight") {
        setMax((prevMax) => Math.min(prevMax + 1, 100));
      }
    }
  };

  const handleMinChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setMin: React.Dispatch<React.SetStateAction<number>>,
    setErrorFeedbackMax: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorFeedbackMin: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    if (+event.target.value < 0) {
      setErrorFeedbackMin(true);

      setTimeout(() => setErrorFeedbackMin(false), 2000);
    }

    if (+event.target.value > 100) {
      setErrorFeedbackMax(true);

      setTimeout(() => setErrorFeedbackMax(false), 2000);
    }

    const value = Math.max(Math.min(+event.target.value, 100), 0);
    setMin(value);
  };

  const handleMaxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setMax: React.Dispatch<React.SetStateAction<number>>,
    setErrorFeedbackMax: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorFeedbackMin: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    if (+event.target.value < 0) {
      setErrorFeedbackMin(true);

      setTimeout(() => setErrorFeedbackMin(false), 2000);
    }

    if (+event.target.value > 100) {
      setErrorFeedbackMax(true);

      setTimeout(() => setErrorFeedbackMax(false), 2000);
    }
    const value = Math.max(Math.min(+event.target.value, 100), 0);
    setMax(value);
  };

  const handleTouchStart = (
    event: React.TouchEvent,
    handleType: "min" | "max",
    startDrag: (value: "min" | "max") => void,
  ) => {
    event.preventDefault();
    startDrag(handleType);
  };

  const handleMouseDown = (
    event: React.MouseEvent,
    handleType: "min" | "max",
    startDrag: (value: "min" | "max") => void,
  ) => {
    event.preventDefault();
    startDrag(handleType);
  };

  return {
    handleMaxPosition,
    handleMinPosition,
    handleDrag,
    handleMouseMove,
    handleKeyDownMin,
    handleKeyDownMax,
    handleMinChange,
    handleMaxChange,
    handleTouchStart,
    handleMouseDown,
  };
};

export default useRange;
