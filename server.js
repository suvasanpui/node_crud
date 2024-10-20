//express is used for creating a server
const express = require("express");
const app = express();
require('dotenv').config();
const passport=require('./auth');

//import db connection
const db = require("./db");

//import port from env
const PORT=process.env.local_port || 3000

//body parser store in req.body---this is most important parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//initialize authentication
app.use(passport.initialize());
const passportAuth=passport.authenticate('local',{session:false})

//default route
app.get("/",function (req, res) {
  res.send("welcome to our hotel");
});

//middleware function
const logRequest=(req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`);
  next();
}
app.use(logRequest); //this middleware apply all route

//import router file
const menuRoute = require("./route/menuRouter");
const personRoute = require("./route/personRoute");


//use the router
app.use("/menu", menuRoute);
app.use("/person",personRoute);

//listening port
app.listen(PORT, () => {
  console.log("Server Connected");
});
