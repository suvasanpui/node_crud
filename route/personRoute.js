const express = require("express");
const route = express.Router();

//import person model
const Person = require("../models/Person");

//post method for data insert in a person collection
route.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("Data insert successfully");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal servr error" });
  }
});

//get method is used for fetch person data
route.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetch successfully");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "some problem for fetch data" });
  }
});

//parmeteized api for person
route.get("/:workType", async (req, res) => {
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
route.put("/:id",async(req,res)=>{
    try{
        const personId=req.params.id;
        const updatePerson=req.body;
        const response=await Person.findByIdAndUpdate(personId,updatePerson,{
            new:true, //return the updated document
            runValidators:true //run mongoose validation
        });
        if(!response){
            res.status(404).json({error:"person not found"})
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