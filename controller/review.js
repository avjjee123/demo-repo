const listing=require("../models/listing.js");
const Review=require("../models/review.js");  

module.exports.createReview=async(req,res,next)=>{ 
    console.log(req.params.id); 
    let Listing= await listing.findById(req.params.id);  
    let review=new Review(req.body.review); 
     review.author=req.user._id; 
    Listing.reviews.push(review);   

    await review.save();
    await Listing.save(); 
    req.flash("success","review inserted");  
    res.redirect(`/listing/${Listing._id}`); 
};

module.exports.destroyReview=async(req,res)=>{
     let {id,reviewId}=req.params;
       await listing.findByIdAndUpdate(id, {$pull:{reviews:reviewId}});
     await Review.findByIdAndDelete(reviewId); 
      req.flash("error","review deleted");   
     res.redirect(`/listing/${id}`);
};       