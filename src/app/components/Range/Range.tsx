"use client";

import useRange from "@/app/hooks/useRange";
import React, { useState, useEffect, useRef } from "react";
import ReusbaleInput from "../ReusableInput/ReusableInput";

interface RangeProps {
  type: "normal" | "fixed";
  minValue?: number;
  maxValue?: number;
  rangeValues?: number[];
}

const Range: React.FC<RangeProps> = ({
  type,
  minValue = 1,
  maxValue = 100,
  rangeValues = [],
}) => {
  const [min, setMin] = useState<number>(minValue);
  const [max, setMax] = useState<number>(maxValue);
  const [minPosition, setMinPosition] = useState<number>(0);
  const [maxPosition, setMaxPosition] = useState<number>(300);
  const [valueType, setValueType] = useState<"min" | "max" | null>(null);
  const [errorFeedbackMin, setErrorFeedbackMin] = useState<boolean>(false);
  const [errorFeedbackMax, setErrorFeedbackMax] = useState<boolean>(false);

  const {
    handleMouseMove,
    handleKeyDownMin,
    handleKeyDownMax,
    handleMaxChange,
    handleMinChange,
    handleMouseDown,
    handleTouchStart,
  } = useRange();

  const rangeWidth = 300;

  const rangeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (type === "fixed" && rangeValues.length > 0) {
      setMin(rangeValues[0]);
      setMax(rangeValues[rangeValues.length - 1]);
      setMinPosition(0);
      setMaxPosition(rangeWidth);
    }
  }, [type, rangeValues]);

  useEffect(() => {
    if (type === "normal") {
      const minPercentage = (min - minValue) / (maxValue - minValue);
      const maxPercentage = (max - minValue) / (maxValue - minValue);
      setMinPosition(minPercentage * rangeWidth);
      setMaxPosition(maxPercentage * rangeWidth);
    }
  }, [min, max, minValue, maxValue, rangeWidth, type]);

  const startDrag = (handleType: "min" | "max") => {
    setValueType(handleType);
  };

  const stopDrag = () => {
    setValueType(null);
  };

  useEffect(() => {
    if (valueType) {
      const moveEvent = (event: MouseEvent | TouchEvent) => {
        return handleMouseMove(event, valueType, rangeRef, {
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
      };
      const stopEvent = () => stopDrag();

      window.addEventListener("mousemove", moveEvent);
      window.addEventListener("mouseup", stopEvent);

      window.addEventListener("touchmove", moveEvent);
      window.addEventListener("touchend", stopEvent);

      return () => {
        window.removeEventListener("mousemove", moveEvent);
        window.removeEventListener("mouseup", stopEvent);
        window.removeEventListener("touchmove", moveEvent);
        window.removeEventListener("touchend", stopEvent);
      };
    }
  }, [
    handleMouseMove,
    max,
    maxPosition,
    min,
    minPosition,
    rangeValues,
    type,
    valueType,
  ]);

  return (
    <div
      ref={rangeRef}
      className="relative"
      style={{ width: rangeWidth + "px" }}
    >
      <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300" />

      <button
        className="absolute top-1/2 transform -translate-y-1/2 w-5 h-5 bg-black rounded-full cursor-grab"
        style={{ left: minPosition + "px" }}
        onMouseDown={(event) => handleMouseDown(event, "min", startDrag)}
        onTouchStart={(event) => handleTouchStart(event, "min", startDrag)}
        onKeyDown={(event) =>
          handleKeyDownMin(
            event,
            setMin,
            min,
            max,
            rangeValues,
            type,
            rangeWidth,
            setMinPosition,
          )
        }
        tabIndex={0}
      />

      <button
        className="absolute top-1/2 transform -translate-y-1/2 w-5 h-5 bg-black rounded-full cursor-grab"
        style={{ left: maxPosition + "px" }}
        onMouseDown={(event) => handleMouseDown(event, "max", startDrag)}
        onTouchStart={(event) => handleTouchStart(event, "max", startDrag)}
        onKeyDown={(event) =>
          handleKeyDownMax(
            event,
            setMax,
            min,
            max,
            rangeValues,
            type,
            rangeWidth,
            setMaxPosition,
          )
        }
        tabIndex={0}
      />

      {type === "normal" ? (
        <div className="absolute top-4 left-0 flex flex-col gap-5 items-center text-sm w-full text-black">
          <div className="flex justify-between w-full">
            <ReusbaleInput
              onChange={(event) =>
                handleMinChange(
                  event,
                  setMin,
                  setErrorFeedbackMax,
                  setErrorFeedbackMin,
                )
              }
              value={min}
              type="min"
            />
            <ReusbaleInput
              onChange={(event) =>
                handleMaxChange(
                  event,
                  setMax,
                  setErrorFeedbackMax,
                  setErrorFeedbackMin,
                )
              }
              value={max}
              type="max"
            />
          </div>
          {errorFeedbackMin && (
            <span className="text-xs text-red-600 font-bold">
              No puedes introducir valores inferiores a 0
            </span>
          )}
          {errorFeedbackMax && (
            <span className="text-xs text-red-600 font-bold">
              No puedes introducir valores superiores a 100
            </span>
          )}
        </div>
      ) : (
        <div className="absolute top-4 left-0 flex justify-between w-full text-sm text-black">
          <span> {min}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  );
};

export default Range;
