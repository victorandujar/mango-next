import request from "supertest";

describe("Given a GET handler function", () => {
  describe("When it is called into the endpoint /api/exercise1", () => {
    test("Then it should return status 200 & min and max values", async () => {
      const response = await request("http://localhost:8080")
        .get("/api/exercise1")
        .expect(200);

      expect(response.body).toHaveProperty("min", 1);
      expect(response.body).toHaveProperty("max", 100);
    });
  });
});
