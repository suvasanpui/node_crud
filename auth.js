const passport=require('passport');
const Person=require('./models/Person');
const localStrategy=require('passport-local').Strategy;

//define passport function
passport.use(new localStrategy(async(userName,password,done)=>{
    //condition apply in authentication for check username and password
    try{
      const user=await Person.findOne({userName:userName});
      if(!user){
        return done(null,false,{message:"invalid username"});
      }
      const isPasswordMatch=await user.comparePassword(password);
      if(isPasswordMatch){
        return done(null,user);
      }else{
        return done(null,false,{message:"password are incorrect"});
      }
  
    }catch(err){
      return done(err);
    }
  
  }))
module.exports=passport;