const express = require("express");
const app = express();
const dotenv = require("dotenv");
const dbConn = require("./init/db");
const Listing = require("./models/listing.js");
const path = require("path");

dotenv.config();

dbConn();

// const PORT = 4001;
const LOCALHOST = "https://localhost:";
let PORT = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({extended: true}));     //data coming in req get parsed

app.get("/", (req, res) => {
  res.send("fine looking site");
});

app.get("/list", async (req, res) => {
  const houseList = await Listing.find({});
  res.render("listinghouse/index.ejs",{houseList});
});

app.get("/list/:id",async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render('./listinghouse/show.ejs',{listing})
})

app.listen(PORT, () => {
  console.log(`listening this at ${LOCALHOST}${PORT}`);
});
