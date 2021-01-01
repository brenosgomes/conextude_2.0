const express = require("express");
const app = require("express")();
const consign = require("consign");
const db = require("./config/db");

consign()
  .include("./config/middleware.js")
  .then("./api/validator.js")
  .then("./api")
  .then("./config/routes.js")
  .into(app);

app.use("/files", express.static("tmp/uploads"));
app.use("/files", express.static("tmp/img"));

app.listen(5000, () => {
  console.log("Backend executando :)");
});
