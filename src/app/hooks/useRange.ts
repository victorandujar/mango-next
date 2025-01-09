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

  return { handleMaxPosition, handleMinPosition, handleDrag, handleMouseMove };
};

export default useRange;
