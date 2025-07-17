const mongoose = require("mongoose");
const listing = require("../models/listing.js");
const initData = require("./data.js"); 

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main()
.then(()=>{
    console.log("connection to DB");
})
.catch((err)=>{
   console.log(err);  
});

async function main(){
   await mongoose.connect(MONGO_URL); 
}; 

const initDB = async ()=>{
 await listing.deleteMany({});
 initData.data=initData.data.map((obj)=>({...obj,owner:'681e35d0151f319bb6f42ffb'}));
 await listing.insertMany(initData.data);
 console.log("data was initialized");
}; 
initDB(); 