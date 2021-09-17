const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const Book = require("./books/books-model.js");


//Instance Of Express App
const server = express();


//Calling Middleware
server.use(cors());
server.use(helmet());
server.use(express.json());


//Endpoints
server.post("/books", async (req, res, next) => {
  try {
      const data = await Book.create(req.body)
      res.status(201).json(data)
  } catch (error) {
    next(error)
  }
});

server.delete("/books/:id", async (req, res, next) => {
  try {
      const data = await Book.remove(req.params.id)
      res.status(204).json(data)
  } catch (error) {
    next(error)
  }
});


//Error-Handling Middleware
server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});


//Exports; Exposing
module.exports = server;