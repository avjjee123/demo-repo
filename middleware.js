const listing =require("./models/listing.js");
const Review=require("./models/review.js"); 
const expressError=require("./utils/expresserror");  
const {listingSchema,reviewSchema}=require("./Schema.js"); 

module.exports.isLoggedIn=(req,res,next)=>{
   let {id}=req.params;  
     if(!req.isAuthenticated()){ //"isAuthenticated" use to check that req.user(which store the user info if login) is "null" or not
      if(req.originalMethod!='GET')  {  
     req.session.redirectUrl=`/listing/${id}`; 
         req.flash("error","you first logged in ");
        return res.redirect("/user/login"); 
      }      
      req.session.redirectUrl=req.originalUrl; 
        req.flash("error","you first logged in "); 
        return res.redirect("/user/login"); 
       
     }
     next(); 
};

module.exports.saveRedirectUrl=(req,res,next)=>{ 
    if(req.session.redirectUrl){
      res.locals.redirectUrl=req.session.redirectUrl; 
    }
    next(); 
};

module.exports.isOwner=async(req,res,next)=>{
      let {id}=req.params;
      let list=await listing.findById(id);
     if(!req.user.equals(list.owner))  
     {
      req.flash("error","Unauthorise");
       return res.redirect(`/listing/${id}`);
     }
     next(); 
};

module.exports.isAuthor=async(req,res,next)=>{
      let {id,reviewId}=req.params;
     let review=await Review.findById(reviewId); 
   if( !res.locals.currentUser._id.equals(review.author._id)){    
           req.flash("error","you are not the author of this review");
           return res.redirect(`/listing/${id}`);
     }
     next(); 
};

module.exports.validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){ 
       let errmsg=error.details.map((el)=> el.message).join(","); 
     throw new expressError(400,errmsg);   
    }
    else{
       next(); 
    }
 };

module.exports.validatereview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){ 
       let errmsg=error.details.map((el)=> el.message).join(","); 
     throw new expressError(400,errmsg);   
    }
    else{
       next(); 
    }
 };

