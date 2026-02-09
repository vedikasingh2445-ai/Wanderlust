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

app.get("/", (req,res)=>{
    res.send("hi i am root");
});

app.get("/listings",async (req,res) =>{
    const alllistings  = await Listing.find({});
    res.render("listings/index.ejs" , {alllistings});
});

app.get("/testListing",async(req,res)=>{
    let sampleListing = new Listing({
        title : "My new Villa",
        description : "By the beach",
        price : 1200,
        location : "Calangute , Goa",
        country : "India",
    });
    await sampleListing.save();
    console.log("sample was save");
    res.send("successful");
});

app.listen(8080,() =>{
     console.log("server is listening");
});