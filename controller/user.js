const user= require("../models/user.js");
    
module.exports.userSignup=async(req,res)=>{  
    try{
        let {username,email,password}=req.body; 
        let newuser=new user({email,username});
      //function "register" register a new user with password
      //and also check username is unique or not
        const registerUser=await user.register(newuser,password);//register(user,password)
        console.log(registerUser);   
        req.login(registerUser,(err)=>{ //req.login is use to assign value to req.user of "registerUser"
             if(err){
                next(err);
             }
             else{
                req.flash("success","Welcome to wanderlust");
                res.redirect("/listing");
             }
        });
       
    } catch(e){
        req.flash("error",e.message);
        res.redirect("/user/sign"); 
    } 
  
};
 
module.exports.userlogin= async(req,res)=>{         
    req.flash("success","you login to wanderlust"); 
    let redirectUrl=res.locals.redirectUrl || "/listing";
    console.log(req.session.redirectUrl);  
    res.redirect(redirectUrl);  
};

module.exports.userlogout=(req,res,next)=>{
    req.logout((e)=>{ //logout is used to to make "req.user" null
       if(e){
        return next(e);
       }
       req.flash("success","logged out!");
       res.redirect("/listing"); 
    });
}; 