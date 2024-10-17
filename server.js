//express is used for creating a server
const express = require("express");
const app = express();
require('dotenv').config()

//import db connection
const db = require("./db");

//import port from env
const PORT=process.env.local_port || 3000

const bodyParser = require("body-parser");
app.use(bodyParser.json());

//default listening
app.get("/", function (req, res) {
  res.send("Welcome to CRUD operation");
});

//import router file
const menuRoute = require("./route/menuRouter");
const personRoute = require("./route/personRoute");


//use the router
app.use("/menu", menuRoute);
app.use("/person", personRoute);

//listening port
app.listen(3000, () => {
  console.log("server created successfully");
});
