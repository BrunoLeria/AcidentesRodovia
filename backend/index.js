const express = require("express");
const app = express();
const port = 80;
const portHttps = 443;
const http = require("http");
const https = require("https");
const bodyParser = require("body-parser");
const cors = require("cors");
const usersController = require("./controllers/users.js");
const reportsController = require("./controllers/reports.js");
const db = require("./models/db.model");

httpServer.listen(port);
httpsServer.listen(portHttps);

app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json({ type: "application/gzip" }));
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.json({ limit: "5mb" }));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/x-www-form-urlencoded

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/users", (req, res) => {
  usersController.create(req, res);
});

app.put("/users", (req, res) => {
  usersController.update(req, res);
});

app.get("/users", (req, res) => {
  usersController.read(req, res);
});

app.delete("/users", (req, res) => {
  usersController.remove(req, res);
});

app.post("/reports", (req, res) => {
  reportsController.create(req, res);
});

app.put("/reports", (req, res) => {
  reportsController.update(req, res);
});

app.get("/reports", (req, res) => {
  reportsController.read(req, res);
});

app.delete("/reports", (req, res) => {
  reportsController.remove(req, res);
});

db.sequelize.sync();
