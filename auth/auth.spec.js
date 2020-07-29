const request = require("supertest");
const db = require("../database/dbConfig");
const server = require("../server");



beforeEach(() => {
    return db.migrate.rollback()
        .then(() => db.migrate.latest())
        .then(() => db.seed.run());
})

test("should add a user into the database", async () => {
    const res = await request(server).post("/api/auth/register").send({
        username: "austin",
        password: "austin",
      });
       expect(res.status).toBe(200)
       expect(res.body.data.username).toBe('austin')
       expect(res.body.data.id).toBe(3)
  });

  test("using an existing seeded user it should log them in", async () => {
    const res = await request(server).post("/api/auth/login").send({
        username: "client",
        password: "pass",
      });
       expect(res.status).toBe(200)
       expect(res.body.message).toBe('Welcome client!')
       expect(res.body.user.username).toBe('client')
  });
