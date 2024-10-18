const mongoose=require('mongoose');
const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    work:{
        type:String,
        required:true,
        enum:["chef","waiter","manager"]
    },
    email:{
        type:String,
        unique:true
    },
    contact:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});

const Person=mongoose.model("Person",personSchema); //persson is a collection name
module.exports=Person;