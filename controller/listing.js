const listing=require("../models/listing.js");
//we upload '@mapbox/mapbox-sdk' from npm to use service geocoding
// from '@mapbox/mapbox-sdk' 
const mbxGeocoding=require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN; 
const geocodingClient=mbxGeocoding({accessToken: mapToken}); 

module.exports.allListing=async(req,res)=>{  
    const allListings=await listing.find({});
    res.render("listing/index.ejs",{allListings}); 
}; 


module.exports.add=async(req,res)=>{  
   // geocoding in structured input mode
     let str=req.body.listing.location+','+req.body.listing.country;
   let response=await geocodingClient.forwardGeocode({
  query:str,  
  limit: 8
})
  .send() 
 console.log(response.body.features[0].geometry);  
   let url=req.file.path;
   let username=req.file.filename; 
  
    let list=new listing(req.body.listing);
    list.owner=req.user._id; 
    list.image={url,username}; 
    list.geometry=response.body.features[0].geometry; 
    let savelist=await list.save();   
    console.log(savelist); 
 req.flash("success","new listing created"); 
 res.redirect("/listing");     
};


module.exports.allDetail=async(req,res)=>{    
 
    let {id}=req.params;
    const list=await listing.findById(id) 
     .populate({
      path:"reviews",
      populate:{
      path:"author",
     },
   })
   .populate("owner"); 
    if(!list){
      req.flash("error","This listing does not exist");
      return res.redirect("/listing");
    }    
     res.render("listing/show.ejs",{list});   };

module.exports.editListing=async(req,res,next)=>{
 try{
    let {id}=req.params; 
    let list=await listing.findById(id); 
    let originalUrl=list.image.url; 
    console.log(originalUrl); 
    originalUrl=originalUrl.replace("/upload","/upload/h_300,w_250");  
  res.render("listing/edit.ejs",{list,originalUrl}); 
 }catch(err){
    next(err); 
 }
}; 

module.exports.updateListing=async(req,res)=>{ 
    let {id}=req.params;
      let list=await listing.findByIdAndUpdate(id,{...req.body.listing});
     if(typeof req.file!=="undefined"){ 
      let url=req.file.path;
      let filename=req.file.filename; 
      list.image={url,filename};  
     }
     
     if(typeof req.body.listing.location!=="undefined"){
      let str=req.body.listing.location+','+req.body.listing.country;
            let response=await geocodingClient.forwardGeocode({
            query:str,
            limit: 1 })
         .send()    
        list.geometry=response.body.features[0].geometry; 
     } 
      await list.save();  
 req.flash("success","listing edited");  
 res.redirect(`/listing/${id}`);   
}; 

module.exports.deleteListing=async(req,res)=>{ 
    try{
       let {id}=req.params;
    await listing.findByIdAndDelete(id);
    req.flash("error","listing deleted");  
    res.redirect("/listing"); 
    }catch(err){
       next(err); 
    }
 };