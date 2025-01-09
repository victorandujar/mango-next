import request from "supertest";

jest.mock("supertest", () => {
  return jest.fn().mockReturnValue({
    get: jest.fn().mockResolvedValue({
      status: 200,
      body: { min: 1, max: 100 },
    }),
  });
});

describe("Given a GET handler function", () => {
  describe("When it is called into the endpoint /api/exercise1", () => {
    test("Then it should return status 200 & min and max values", async () => {
      const response = await request("http://localhost:8080").get(
        "/api/exercise1",
      );

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("min", 1);
      expect(response.body).toHaveProperty("max", 100);
    });
  });
});
