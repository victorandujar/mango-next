import apiUrls from "../utils/apiUrls";

export const getMinMaxValuesService = async (): Promise<{
  min: number;
  max: number;
  error?: string;
}> => {
  try {
    const response = await fetch(apiUrls.exercise1);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    return {
      min: 0,
      max: 0,
      error: (error as Error).message,
    };
  }
};

export const getRangeValuesService = async (): Promise<{
  rangeValues: number[];
  error?: string;
}> => {
  try {
    const response = await fetch(apiUrls.exercise2);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    return {
      rangeValues: [],
      error: (error as Error).message,
    };
  }
};
