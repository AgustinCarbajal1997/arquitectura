const request = require("supertest")("http://localhost:8080");
const expect = require("chai").expect;

describe("API - GET - /api/products/getAll", () => {
  it("Should return status 200", async () => {
    let response = await request.get("/api/products/all");
    expect(response.status).to.eql(200);
  });
  it("Should return an array", async () => {
    let response = await request.get("/api/products/all");
    response = JSON.parse(response.text);
    expect(response.data).to.be.an("array");
  });
});

describe("API - GET - /api/products/getById/:id", () => {
  it("Should return status 200", async () => {
    let response = await request.get(
      "/api/products/getById/620193e6085201a886fbf455"
    );
    expect(response.status).to.eql(200);
  });
  it("Should return an object", async () => {
    let response = await request.get(
      "/api/products/getById/620193e6085201a886fbf455"
    );
    response = JSON.parse(response.text);
    expect(response.data).to.be.an("object");
  });
});

describe("API - GET - /api/products/getSeveralIds", () => {
  it("Should return status 200", async () => {
    let response = await request.get(
      "/api/products/getSeveralIds?q[]=620193e6085201a886fbf455&q[]=620193e6085201a886fbf456&q[]=6201e776085201a886fbf457&q[]=6201e776085201a886fbf458"
    );
    expect(response.status).to.eql(200);
  });
  it("Should return an array", async () => {
    let response = await request.get(
      "/api/products/getSeveralIds?q[]=620193e6085201a886fbf455&q[]=620193e6085201a886fbf456&q[]=6201e776085201a886fbf457&q[]=6201e776085201a886fbf458"
    );
    response = JSON.parse(response.text);
    expect(response.data).to.be.an("array");
  });
  it("Should return an array", async () => {
    let response = await request.get(
      "/api/products/getSeveralIds?q[]=620193e6085201a886fbf455"
    );
    response = JSON.parse(response.text);
    expect(response.data).to.be.an("array");
  });
  it("Should return status 400 bad request", async () => {
    let response = await request.get(
      "/api/products/getSeveralIds?q[]=620193e6085201a886fbf455&q[]="
    );
    expect(response.status).to.eql(400);
  });
});

describe("API - GET - /api/products/getByCategory/:category", () => {
  it("Should return status 200", async () => {
    let response = await request.get("/api/products/getByCategory/Calzados");
    expect(response.status).to.eql(200);
  });
  it("Should return an array", async () => {
    let response = await request.get("/api/products/getByCategory/Calzados");
    response = JSON.parse(response.text);
    expect(response.data).to.be.an("array");
  });
  it("Should return an array", async () => {
    let response = await request.get("/api/products/getByCategory/caza");
    response = JSON.parse(response.text);
    expect(response.data).to.be.an("array").that.is.empty;
  });
});

describe("API - GET - /api/products/getHighlights", () => {
  it("Should return status 200", async () => {
    let response = await request.get("/api/products/getHighlights");
    expect(response.status).to.eql(200);
  });
  it("Should return an array", async () => {
    let response = await request.get("/api/products/getHighlights");
    response = JSON.parse(response.text);
    expect(response.data).to.be.an("array");
  });
});

describe("API - GET - /api/products/getProductHighlighted", () => {
  it("Should return status 200", async () => {
    let response = await request.get("/api/products/getProductHighlighted");
    expect(response.status).to.eql(200);
  });
  it("Should return an array", async () => {
    let response = await request.get("/api/products/getProductHighlighted");
    response = JSON.parse(response.text);
    expect(response.data).to.be.an("array");
  });
});
