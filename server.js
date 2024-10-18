//express is used for creating a server
const express = require("express");
const app = express();
require('dotenv').config();
const passport=require('passport');
const localStrategy=require('passport-local').Strategy;
const Person=require('./models/Person');

//import db connection
const db = require("./db");

//import port from env
const PORT=process.env.local_port || 3000

//body parser store in req.body
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//default route
app.get("/", function (req, res) {
  res.send("Welcome to CRUD operation");
});

//define passport function
passport.use(new localStrategy(async(userName,password,done)=>{
  //condition apply in authentication for check username and password
  try{
    const user=Person.findOne({userName:userName});
    if(!user){
      return done(null,false,{message:"invalid username"});
    }
    const isPasswordMatch=user.password===password ? true : false;
    if(isPasswordMatch){
      return done(null,user);
    }else{
      return done(null,false,{message:"password are incorrect"});
    }

  }catch(err){
    return done(err);
  }

}))

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
app.use("/person", personRoute);

//listening port
app.listen(PORT, () => {
  console.log("server created successfully");
});
