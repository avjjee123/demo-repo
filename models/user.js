const mongoose=require("mongoose");
const schema=mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose");

const userSchema=new schema({
    email:{
        type:String,
        required:true,
    },  
});

//add username and password by plugin with passportLocalMongoose
//automatically and add salting and hash function
userSchema.plugin(passportLocalMongoose);

const user=mongoose.model("user",userSchema);
module.exports=user;  
