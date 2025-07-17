if(process.env.NODE_ENV!="production") //as not to use .env file in production phase(when we deploy our project)
//we only use .env file in development phase(when we develop our website)
   { 
   require("dotenv").config();  //use "dotenv" npm file to use .env file credential 
}

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path"); 

const methodOverride = require("method-override");
const ejsMate=require("ejs-mate"); 
const cookieParser=require("cookie-parser") //without cookie-parser we can use cookie
const session=require("express-session");
const MongoStore = require('connect-mongo');//to use mongo-session 
const flash=require("connect-flash");   //without express-session flash does not working
const passport=require("passport"); //passport also use "session" to store data in every web page
const localStratergy=require("passport-local");
const user=require("./models/user.js"); 
 
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views")); 
app.use(express.urlencoded({extended:true})); 
app.use(methodOverride("_method"));  
app.engine("ejs",ejsMate); 
app.use(express.static(path.join(__dirname,"/public"))); 

const ListingsRouter=require("./routes/listing.js"); 
const reviewsRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js"); 
const expressError = require("./utils/expresserror.js");

 //const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

 const dburl=process.env.ATLASDB_URL;  

async function main() {
   await mongoose.connect(dburl);    
}
main().catch(err => console.log(err)); 

const store = MongoStore.create({
   mongoUrl: dburl,  //location of data-storage
   crypto:{   //use crypto to make secret code safe                  
      secret:process.env.SECRET, 
   },
   touchAfter:24*3600, //time after session referesh(in sec)
});

store.on("error",()=>{
   console.log("ERROR in MONGO SESSION STORE",err);
}); 

app.use(session({ 
   store:store,
   secret:process.env.SECRET, //we add secret to create secret cookies
   resave:false, //so to stop resave in session store again and again
   saveUninitialized:true, //force a session that is "uninitialized" to save in session store
   cookie:{
   expires:Date.now()+ 7*24*60*60*1000, 
   maxAge:7*24*60*60*1000,    
   httponly:true,  //to safe from "cross screpting attack"
     }, 
         }     
));

app.use(flash()); 

//passport store user in req.user
app.use(passport.initialize()); //a middleware to initialise the passport
app.use(passport.session());  //to not to add passport on every page
passport.use(new localStratergy(user.authenticate())); //to get password in schema formate 

passport.serializeUser(user.serializeUser()); //to add user on our website when we login/signup
passport.deserializeUser(user.deserializeUser()); //to delete user when we close our website after expire

app.use((req,res,next)=>{
   //locals store data which we use in any .ejs file
   //without passing it
   res.locals.successMsg=req.flash("success"); 
   res.locals.errorMsg=req.flash("error"); 
   res.locals.currentUser=req.user; //we use res.local to use req.user in .ejs file as req.user not goto .ejs 
   next(); 
})

app.listen(8080,()=>{
  console.log("server is connected");
});

app.get("/newuser",async(req,res)=>{
      let fakeUser=new user({
         email:"avj@gmail.com",
         username:"delta-avj",
      });
     
      let newUser = await user.register(fakeUser,"hellowords"); 
      res.send(newUser); 
});

// app.get("/register",(req,res)=>{
//    let {name= "anonymous"}=req.query;
//    req.session.name=name;
//    if(name==="anonymous")
//    {
//       req.flash("error","user not defined"); 
//    }else {
//       req.flash("success","user register successfully");
//    }
//    res.redirect("/hello");
// });

// app.get("/hello",(req,res)=>{ 
//    res.render("listing/page.ejs",{name:req.session.name}); 
// });

// app.get("/secret",(req,res)=>{
//    if(req.session.count)
//    {
//       req.session.count++;
//    }else{
//       req.session.count=1; 
//    }
//    res.send(`your count is ${req.session.count}`);  
// });
 
app.use(cookieParser("secreateCode")); //we use cookieparse to pass cookie as request (req.)
//we add secreateCode in cookieParser so that we can make signed cookies
app.get("/getSignedCookie",(req,res)=>{
  res.cookie("made-in","India",{signed:true}); //if value of signed cookies changed then it does not show 
  res.send("signed cookie sent"); 
});
app.get("/verified",(req,res)=>{
   console.log(req.signedCookies); 
   res.send("verified"); 
});
app.get("/",(req,res)=>{
   console.dir(req.cookies);  //we pass all cookies
    res.send("you are on rootttttttttttttth"); 
});
app.get("/greet",(req,res)=>{
   let {name="anamouse"}=req.cookies;
   res.send(`hi ${name}`);  //by this we can use cookie in website
});

app.use("/listing",ListingsRouter);  // /listing is a parent roter
app.use("/listing/:id/review",reviewsRouter);  // /listing/:id/review is a parent roter
app.use("/user",userRouter);   // /user is a parent roter

// app.all("*",(req,res,next)=>{
//    next(new expressError(404,"page not found")); 
// });

app.use((err,req,res,next)=>{
   let {statusCode=500,message="get my doubt"}=err;  
  // console.log("error in midWare")
   res.status(statusCode).render("listing/error.ejs",{err}); 
});  
   
