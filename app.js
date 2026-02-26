const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");

const Mong_Url = "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err); 
})

async function main(){
    await mongoose.connect(Mong_Url);
}

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));

app.get("/", (req,res)=>{
    res.send("hi i am root");
});
//Index route
app.get("/listings",async (req,res) =>{
    const alllistings  = await Listing.find({});
    res.render("listings/index.ejs" , {alllistings});
});

//New route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});
//Show route
app.get("/listings/:id",async(req,res)=>{
    let {id} = req.params;
   const listing = await Listing.findById(id); 
   res.render("listings/show",{listing});
});

//create route
app.post("/listings",async (req, res) => {
     const newListing  = new Listing(req.body.listing);
     await newlisting.save;
})


// app.get("/testListing",async(req,res)=>{
//     let sampleListing = new Listing({
//         title : "My new Villa",
//         description : "By the beach",
//         price : 1200,
//         location : "Calangute , Goa",
//         country : "India",
//     });
//     await sampleListing.save();
//     console.log("sample was save");
//     res.send("successful");
// });

app.listen(8080,() =>{
     console.log("server is listening");
});