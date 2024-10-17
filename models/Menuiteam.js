const mongoose=require('mongoose');
const menuSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        default:1200
    },
    isDrink:{
        type:String,
        boolean:true,
        default:false
    },
    ingredient:{
        type:[String]
    },
    num_sales:{
        type:Number,
        default:0
    }

});
const MenuIteam=mongoose.model("MenuIteam",menuSchema);
module.exports=MenuIteam;