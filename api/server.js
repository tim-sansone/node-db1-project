const express = require("express");
const server = express();

const accountsRouter = require('./accounts/accounts-router')

server.use(express.json());
server.use('/api/accounts', accountsRouter)

server.use((error, req, res, next) => {
    res.status(error.status || 500).json({message: error.message || 'internal server error'})
})

module.exports = server;
