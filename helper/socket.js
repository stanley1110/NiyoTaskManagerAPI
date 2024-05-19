const express = require("express");
const socket = require("socket.io");
const app = express();

const server = require("http").createServer(app);

const io = socket(server, {
  cors: {
    origin: "*",
  },
});

module.exports = { io, server, app };
