require("./db/db.js");

const express = require("express");
const app = express();
const routes = require("./api/routes");

app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
})

app.set("port", 3000);

app.use("/", routes);

const server = app.listen(app.get("port"), function(req, res) {
  const port = server.address().port;
  console.log("Listening to port " + port);
})