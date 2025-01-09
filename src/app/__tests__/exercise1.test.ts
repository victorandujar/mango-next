import { NextResponse } from "next/server";
import { GET } from "../api/exercise1/route";

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn(),
  },
}));

describe("Given a GET handler function", () => {
  describe("When it is called into the endpoint /api/exercise1", () => {
    test("Then it should return status 200 & min and max values", async () => {
      (NextResponse.json as jest.Mock).mockReturnValue({
        status: 200,
        body: { min: 1, max: 100 },
      });

      const response = await GET();

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("min", 1);
      expect(response.body).toHaveProperty("max", 100);
    });
  });
});
