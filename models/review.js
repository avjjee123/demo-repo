const { number } = require("joi");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const reviewSchema=new Schema({
   comment:{
      type:String,
   },
   rating:{
    type:Number, 
    min:1,max:5,
    default:1,
   },
   createdAt:{
    type:Date, 
    default:Date.now(), 
   },
   author:{
      type:Schema.Types.ObjectId,
      ref:"user",
   }
});

const Review=mongoose.model("Review",reviewSchema);
module.exports=Review; 
