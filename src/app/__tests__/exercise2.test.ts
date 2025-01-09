import { NextResponse } from "next/server";
import { GET } from "../api/exercise2/route";

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn(),
  },
}));

describe("Given a GET handler function", () => {
  describe("When it is called into the endpoint /api/exercise2", () => {
    test("Then it should return status 200 & the prop rangeValues with the number array provided", async () => {
      (NextResponse.json as jest.Mock).mockReturnValue({
        status: 200,
        body: { rangeValues: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99] },
      });

      const response = await GET();

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "rangeValues",
        [1.99, 5.99, 10.99, 30.99, 50.99, 70.99],
      );
    });
  });
});
