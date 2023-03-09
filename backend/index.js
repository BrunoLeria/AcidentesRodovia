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

app.post("/user", (req, res) => {
  usersController.create(req, res);
});

app.put("/user", (req, res) => {
  usersController.update(req, res);
});

app.get("/user", (req, res) => {
  usersController.read(req, res);
});

app.delete("/user", (req, res) => {
  usersController.delete(req, res);
});

app.post("/report", (req, res) => {
  reportsController.create(req, res);
});

app.put("/report", (req, res) => {
  reportsController.update(req, res);
});

app.get("/report", (req, res) => {
  reportsController.read(req, res);
});

app.delete("/report", (req, res) => {
  reportsController.delete(req, res);
});

app.get("/allReports", (req, res) => {
  reportsController.readAll(req, res);
});

db.sequelize.sync();