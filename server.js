const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('./auth/authenticate-middleware.js');
const authRouter = require('./auth/auth-router.js');
const classesRouter = require('./classes/classes-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({message: "Welcome!"})
  })

server.use('/api/auth', authRouter);
server.use('/api/classes', classesRouter)

module.exports = server