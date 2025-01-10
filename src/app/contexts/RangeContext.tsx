"use client";

import React, { createContext, useContext } from "react";

interface RangeContextProps {
  minMaxValues: { min: number; max: number };
  values: { rangeValues: number[] };
}

const RangeContext = createContext<RangeContextProps | undefined>(undefined);

export const RangeProvider: React.FC<{
  children: React.ReactNode;
  minMaxValues: { min: number; max: number };
  values: { rangeValues: number[] };
}> = ({ children, minMaxValues, values }) => {
  return (
    <RangeContext.Provider value={{ minMaxValues, values }}>
      {children}
    </RangeContext.Provider>
  );
};

export const useRangeContext = () => {
  const context = useContext(RangeContext);
  if (!context) {
    throw new Error("useRangeContext must be used within a RangeProvider");
  }
  return context;
};
