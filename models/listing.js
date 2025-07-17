const mongoose =require("mongoose");
const Review=require("./review.js");
// const user=require("./user.js"); 
const listingschema=new mongoose.Schema({
   title:{
    type:String,
    require:true,
   },
   description:{
     type:String,
   },  
   image:{ 
      url:String,
      filename:String,  
   },
   price:Number,
   location:String,
   country:String,
   reviews:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Review",
    },],
    owner:{
       type:mongoose.Schema.Types.ObjectId, 
    ref:"user"
    }, 
    geometry:{   //GeoJSON formate
      type:{
        type:String,
        enum:['Point'], //location must be a single point
         required:true
      },
      coordinates:{
        type:[Number],
        required:true
      }
    }
});


//we use findOneAndDelete as it behaves as a middleware and
//we use to delete reviews as our listing delete its reviews also delete
listingschema.post("findOneAndDelete",async(listing)=>{
  if(listing) {
    await Review.deleteMany({_id: { $in: listing.reviews } });
  }
});

const listing=mongoose.model("listing",listingschema);    
module.exports=listing; 


