const express = require("express");
const app = express();
const dotenv = require("dotenv");
const dbConn = require("./init/db");
const Listing = require("./models/listing.js");
const path = require("path");
const over_ride = require("method-override");

dotenv.config();

dbConn();

// const PORT = 4001;
const LOCALHOST = "https://localhost:";
let PORT = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true })); //data coming in req get parsed
app.use(over_ride("_method"))

app.get("/", (req, res) => {
  res.send("fine looking site");
});

app.get("/list", async (req, res) => {
  const houseList = await Listing.find({});
  res.render("listinghouse/index.ejs", { houseList });
});

//lists route
app.get("/list/new", (req, res) => {
  res.render("listinghouse/newForm.ejs");
});

//create Route
app.post("/list", async (req, res) => {
  const newLists = new Listing(req.body.lists);
  await newLists.save();
  res.redirect("/list");
});

app.get("/list/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("./listinghouse/show.ejs", { listing });
});

//edit Route
app.get("/list/:id/edit",async (req,res)=>{
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listinghouse/edit.ejs",{listing})
})

//update Route
app.put("/list/:id",async (req,res)=>{
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id,{...req.body.listing});
  res.redirect("/list");
})
 
app.listen(PORT, () => {
  console.log(`listening this at ${LOCALHOST}${PORT}`);
});
