export interface SharedHandlerPositionParams {
  type: "fixed" | "normal";
  currentPosition: number;
  rangeValues: number[];
  rangeWidth: number;
}

export interface MinPositionParams extends SharedHandlerPositionParams {
  setMinPosition: (value: number) => void;
  setMin: (value: number) => void;
  maxPosition: number;
  max: number;
}

export interface MaxPositionParams extends SharedHandlerPositionParams {
  setMaxPosition: (value: number) => void;
  setMax: (value: number) => void;
  minPosition: number;
  min: number;
}

export type HandlePositions = Omit<MinPositionParams, "currentPosition"> &
  Omit<MaxPositionParams, "currentPosition">;
