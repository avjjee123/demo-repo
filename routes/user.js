const express=require("express");
const router=express.Router();
const passport=require("passport"); 
const { saveRedirectUrl } = require("../middleware.js");
const controllerUser=require("../controller/user.js"); 

function asyncwrap(fn){
    return function(req,res,next){
      fn(req,res,next).catch((err)=>{ 
       next(err)}); 
    };
 };

//signup
router.route("/sign")
   .get((req,res)=>{res.render("user/sign.ejs");})
   .post(asyncwrap(controllerUser.userSignup));


//login
router.route("/login")
   .get((req,res)=>{res.render("user/login.ejs");})
   .post(saveRedirectUrl,
    passport.authenticate("local",{ //passport.authenticate test the authority of password and username
    failureRedirect:"/user/login", //redirect to which URL after error
    failureFlash:true,   //show flash or not   
}),controllerUser.userlogin); 


//logout
router.get("/logout",controllerUser.userlogout); 

module.exports=router; 