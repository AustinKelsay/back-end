const request = require("supertest");
const db = require("./database/dbConfig");
const server = require("./server");

beforeEach(() => {
    return db.migrate.rollback()
        .then(() => db.migrate.latest())
        .then(() => db.seed.run());
})

describe('GET /', () => {
    it('returns 200 status code with welcome message', () => {
        return request(server).get('/')
            .then((response) => {
                expect(response.status).toBe(200)
                expect(response.body.message).toBe("Welcome!")
            })
            
    })
})