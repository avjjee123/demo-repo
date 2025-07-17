const express=require("express");
const router = express.Router();
const {isLoggedIn, isOwner,validateListing}=require("../middleware.js");  
const listingController= require("../controller/listing.js");

const {storage}=require("../cloudConfig.js"); 

//multer is a middleware, used to upload file(multipart/form-data),not process other then multipart 
const multer=require("multer"); 
const upload =multer({storage}); //use upload so we know where we want to save file

 function wrapasync(fn){
    return function(req,res,next){
      fn(req,res,next).catch((err)=>{ 
       next(err)}); 
    };
 };  

//show all listings
router.get("/",wrapasync(listingController.allListing));      

//add new listing
router.route("/new")
   .get(isLoggedIn,(req,res,next)=>{res.render("listing/add.ejs"); })
    .post(validateListing,isLoggedIn,upload.single("listing[image]")
    ,wrapasync(listingController.add));
  
//edit listing
router.route("/:id/edit")
   .get(isLoggedIn,isOwner,listingController.editListing )     
   .put(validateListing,isLoggedIn,isOwner,upload.single("listing[image]"),
   listingController.updateListing);

//show all details of the listing
router.get("/:id",listingController.allDetail);     

//delete listing
router.delete("/:id/delete",isLoggedIn,isOwner,
  wrapasync(listingController.deleteListing));  

module.exports=router; 