const express=require("express");
const router = express.Router({mergeParams: true});  //we use mergeParams to merge req.params value from parent router with child router 
// const Review= require("../models/review.js"); 
// const listing = require("../models/listing.js"); 
const {validatereview, isLoggedIn,isAuthor}=require("../middleware.js"); 
const reviewController=require("../controller/review.js")

function asyncwrap(fn){
   return function(req,res,next){
     fn(req,res,next).catch((err)=>{ 
      next(err)}); 
   };
};

 //review adding
//post method
router.post("/",validatereview,isLoggedIn,asyncwrap(reviewController.createReview));

//delete review
//also from listing
router.delete("/:reviewId",isLoggedIn,isAuthor,
  reviewController.destroyReview);


module.exports=router; 