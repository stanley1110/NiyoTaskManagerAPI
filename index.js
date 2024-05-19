const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerUI = require("swagger-ui-express");
const bodyparser = require("body-parser");
const userRoute = require("./routes/userRoute");
const taskRoute = require("./routes/taskRoute");
const { io, server, app } = require("./helper/socket");
require("./db");
require("dotenv").config();

const PORT = process.env.PORT;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Manager API",
      description: "Example of CRUD API ",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  apis: ["./routes/*.js"],
};
const specs = swaggerJsDoc(options);

app.use(bodyparser.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/users", userRoute);
app.use("/tasks", taskRoute);

app.set("view engine", "ejs");
app.set(express.urlencoded({ extended: false }));

app.use(express.json());

//landing page
app.get("/", (req, res) => {
  res.render("index");
});

server.listen(PORT, () => {
  console.log(
    `Niyo Task Management Api app listening at http://localhost:${PORT}`
  );
});

io.on("connection", () => {
  console.log("socket has connected");
});
