import { getMinMaxValuesService, getRangeValuesService } from "./rangeServices";

global.fetch = jest.fn();

describe("Given a getMinMaxValuesService rangeServices function", () => {
  describe("When it is called", () => {
    test("Then it should return min and max data when the request is successful", async () => {
      const values = { min: 1, max: 100 };

      (fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(values),
        ok: true,
      });

      const result = await getMinMaxValuesService();

      expect(result).toEqual(values);
    });

    test("Then it should return min and max values with 0 and an error message when the request fails", async () => {
      const values = { min: 0, max: 0, error: "Failed to fetch data" };

      (fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(values),
        ok: false,
      });

      const result = await getMinMaxValuesService();

      expect(result).toEqual(values);
    });
  });
});

describe("Given a getRangeValuesService rangeServices function", () => {
  describe("When it is called", () => {
    test("Then it should return rangeValues data when the request is successful", async () => {
      const values = { rangeValues: [1, 2, 3, 4, 5] };

      (fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(values),
        ok: true,
      });

      const result = await getRangeValuesService();

      expect(result).toEqual(values);
    });

    test("Then it should return rangeValues as empty array and an error message when the request fails", async () => {
      const values = { rangeValues: [], error: "Failed to fetch data" };

      (fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(values),
        ok: false,
      });

      const result = await getRangeValuesService();

      expect(result).toEqual(values);
    });
  });
});
