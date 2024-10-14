import request from "supertest";
import app from "../index.js";

describe("API Endpoints", () => {
  it("should create a new item", async () => {
    const newItem = { name: "New Project", microtasks: [] };
    const res = await request(app).post("/items").send(newItem);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toEqual(newItem.name);
  });

  it("should update an existing item", async () => {
    const updatedData = { name: "Updated Project" };
    const res = await request(app).put("/items/1").send(updatedData);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Item updated");
    expect(res.body.updatedFields.name).toEqual(updatedData.name);
  });

  it("should fetch a single item by ID", async () => {
    const res = await request(app).get("/items/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toEqual(1);
  });

  it("should return 404 for non-existing item", async () => {
    const res = await request(app).get("/items/999");
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual("Item not found");
  });
});
