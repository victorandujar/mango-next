import request from "supertest";

describe("Given a GET handler function", () => {
  describe("When it is called into the endpoint /api/exercise1", () => {
    test("Then it should return status 200 & the prop rangeValues with the number array provided", async () => {
      const response = await request("http://localhost:8080")
        .get("/api/exercise2")
        .expect(200);

      expect(response.body).toHaveProperty(
        "rangeValues",
        [1.99, 5.99, 10.99, 30.99, 50.99, 70.99],
      );
    });
  });
});
