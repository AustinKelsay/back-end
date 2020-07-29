const server = require('../server')
const request = require("supertest");
const Classes = require("./classes-model");
const db = require("../database/dbConfig");
const bcrypt = require('bcrypt');

 beforeEach(() => {
     return db.migrate.rollback()
         .then(() => db.migrate.latest())
         .then(() => db.seed.run());
 })

 describe('GET /', () => {
     it('returns 200 status code', () => {
         return request(server).get('/api/classes')
            .then((res) => {
                expect(res.status).toBe(200)
                expect(res.body[0]).toHaveProperty('id')
                expect(res.body[0].name).toBe("Yoga")
            })
     })
 })

 const testClass = {
    name: 'test',       
    type: 'test', 
    startTime: '2:00pm',
    duration: '1 hour', 
    intensity: 1,
    location: 'park',
    numberOfRegisteredAttendees: 7,
    maxClassSize: 12
 }

 describe('POST /', () => {
    it('returns 400 status code and message if you are not logged in', () => {
        return request(server).post('/api/classes').send(testClass)
           .then((res) => {
               expect(res.status).toBe(400)
               expect(res.body.message).toBe("You are not logged in")
           })
    })
    it('logs the instructor in and posts a test class', async () => {
        const login = await request(server).post("/api/auth/login").send({
            username: "client",
            password: 'pass'
          })
          expect(login.status).toBe(200)

        const classesPost = await request(server).post('/api/classes')
        .set('authorization', login.body.token)
        .set('Content-type', 'application/json')
        .send(testClass)
        expect(classesPost.status).toBe(201)
        expect(classesPost.body).toStrictEqual({
            id: 3,
            name: 'test',       
            type: 'test', 
            startTime: '2:00pm',
            duration: '1 hour', 
            intensity: 1,
            location: 'park',
            numberOfRegisteredAttendees: 7,
            maxClassSize: 12
         })
         //check to see if the test class is there with a get req
        const classes = await request(server).get('/api/classes')
        expect(classes.body[2]).toStrictEqual({
            id: 3,
            name: 'test',       
            type: 'test', 
            startTime: '2:00pm',
            duration: '1 hour', 
            intensity: 1,
            location: 'park',
            numberOfRegisteredAttendees: 7,
            maxClassSize: 12
        })
    })
})
    
describe('DELETE /:id', () => {
    it('gets the seed classes and then deletes one of the test classes', async () => {
        const classes = await request(server).get('/api/classes')
        expect(classes.body[1]).toStrictEqual({
            id: 2,
            name: 'Pilates',
            type: 'cardio',
            startTime: '1:00pm',
            duration: '1 hour',
            intensity: 3,
            location: 'mall',
            numberOfRegisteredAttendees: 11,
            maxClassSize: 20
        })
        const login = await request(server).post("/api/auth/login").send({
            username: "client",
            password: 'pass'
        })
        expect(login.status).toBe(200)
        
        const classDelete = await request(server).delete('/api/classes/2')
        .set('authorization', login.body.token)
        .set('Content-type', 'application/json')
        expect(classDelete.status).toBe(200)
    })
})

describe('PUT /:id', () => {
    it('does a put request and changes one of the seed classes', async () => {
        const login = await request(server).post("/api/auth/login").send({
            username: "client",
            password: 'pass'
        })
        expect(login.status).toBe(200)
        
        const classPut = await request(server).put('/api/classes/2')
        .set('authorization', login.body.token)
        .set('Content-type', 'application/json')
        .send(testClass)
        expect(classPut.status).toBe(200)

        const classes = await request(server).get('/api/classes')
        expect(classes.body[1]).toStrictEqual({
            id: 2,
            name: 'test',       
            type: 'test', 
            startTime: '2:00pm',
            duration: '1 hour', 
            intensity: 1,
            location: 'park',
            numberOfRegisteredAttendees: 7,
            maxClassSize: 12
        })
    })
})