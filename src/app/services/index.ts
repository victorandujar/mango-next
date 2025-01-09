import { getMinMaxValuesService, getRangeValuesService } from "./rangeServices";

type RangeServices = {
  getMinMaxValues: () => Promise<{ min: number; max: number }>;
  getRangeValues: () => Promise<{ rangeValues: number[] }>;
};

const rangeServices: RangeServices = {
  getMinMaxValues: getMinMaxValuesService,
  getRangeValues: getRangeValuesService,
};

export default rangeServices;
