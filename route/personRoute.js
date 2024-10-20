const express = require("express");
const route = express.Router();
const {jwtmiddleware,generateToken}=require('./../jwt')

//import person model
const Person = require("../models/Person");

//post method for user registration in a person collection
route.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("Data insert successfully");

    //create payload for generate token
    const jwtPayload={
      id:response.id,
      userName:response.userName
    }
    console.log(JSON.stringify(jwtPayload))
    //parameter pass to generate token function 
    const token=generateToken(jwtPayload);
    console.log("token",token);

    res.status(200).json({response: response,token:token});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal servr error" });
  }
});


//post method for user login in a person collection
route.post('/login',async(req,res)=>{
  
  try{
    //extrct username and password fom request body
    const {userName,password}=req.body;
    //check username in person database
    const user=await Person.findOne({userName:userName});
    if(!user || !(await user.comparePassword(password))){ //comparePassword is a function that match user with a password
      return res.status(401).json({error: "invalid username and password"})
    } 

    //generate token
    const userPayload={
      id:user.id,
      userName:user.userName
    }
    //token generate
    const token=generateToken(userPayload);
    //return response
    res.json({token})
  }catch(err){
    console.log(err);
    res.status(500).json({error: "internal server error"})
  }

})

//get method is used for fetch all person data
route.get("/",jwtmiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetch successfully");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "some problem for fetch data" });
  }
});

route.get('/profile',jwtmiddleware,async(req,res)=>{
  try{
  const userData=req.user;
  const userId=userData.id;
  const response=await Person.findById(userId)
  res.json(response);
  }catch(err){
    console.error(err);
    res.status(500).json({error:"user not found"})
  }
})

//parmeteized api for person
route.get("/:workType",jwtmiddleware, async (req, res) => {
  //workType is a variable
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "waiter" || workType == "manager") {
      const data = await Person.find({ work: workType });
      console.log("data fetch successfuly");
      res.status(200).json(data);
    } else {
      console.log("something is wrong");
      res.status(400).json({ error: "some problem for fetch data" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "some problem for fetch data" });
  }
});


//parameterized api for update data
route.put("/:id",jwtmiddleware,async(req,res)=>{
    try{
        const personId=req.params.id;
        const updatePerson=req.body;
        const response=await Person.findByIdAndUpdate(personId,updatePerson,{
            new:true, //return the updated document
            runValidators:true //run mongoose validation
        });
        if(!response){
            res.status(404).json({error:"Person not found"})
        }
        console.log("data updated successfully");
        res.status(200).json(response);
    }catch (err) {
        console.log(err);
        res.status(500).json({ error: "some problem for fetch data" });

    }
});

//parameterized api for delete a data
route.delete("/:id",async(req,res)=>{
    try{
        const personId=req.params.id;
        const response=await Person.findByIdAndDelete(personId);
        if(!response){
            res.status(404).json({error:"person not found"})
        }
        console.log("delete successfully");
        res.status(200).json(response);
    }catch (err) {
        console.log(err);
        res.status(500).json({ error: "some problem for fetch data" });
    }
})



module.exports=route;