const express = require("express");
const route = express.Router();

//import menu model
const MenuIteam = require("../models/Menuiteam");

//post method for data insert in a menu collection
route.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new MenuIteam(data);
    const response = await newMenu.save();
    console.log("Data insert successfully");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal servr error" });
  }
});

//post method is used for parameterized api
route.get("/:ingredientType", async (req, res) => {
  try {
    const ingredientType = req.params.ingredientType;
    if (
      ingredientType == "sweet" ||
      ingredientType == "juicy" ||
      ingredientType == "slice"
    ) {
      const data = await MenuIteam.find({ ingredient: ingredientType });
      console.log("data fetch successfuly");
      res.status(200).json(data);
    } else {
      res.status(400).json({ error: "Internal servr error" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "fetching problem" });
  }
});

//get method is used for fetch menu data
route.get("/", async (req, res) => {
  try {
    const data = await MenuIteam.find();
    console.log("data fetch successfully");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "some problem for fetch data" });
  }
});

module.exports = route;
