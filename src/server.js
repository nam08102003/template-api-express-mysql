/* eslint-disable no-undef */
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const path = require("path");
const routesV1 = require("./v1/routes/index.js");

dotenv.config();

// Init Server
const server = express();

const port = process.env.PORT || 8000;

// Set Header
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );

  next();
});

//Template Engine
server.set("views", path.join(__dirname, "views"));
server.set("view engine", "ejs");

server.use(helmet());
server.use(morgan("common"));
server.use(bodyParser.json({ limit: "20mb" }));
server.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
server.use(cookieParser());
server.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Routes
server.use("/api/v1", routesV1);

// Listen Port
server.listen(port, () => {
  console.log("Connect server success in port", port);
});
