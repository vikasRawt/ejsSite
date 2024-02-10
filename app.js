const express = require("express");
const app = express();
const dotenv = require("dotenv");
const dbConn = require("./init/db");
const Listing = require("./models/listing.js");
const path = require("path");
const over_ride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const expressError = require("./utils/ExpressError.js");
const listingSchema = require("./schema.js");

dotenv.config();

dbConn();

// const PORT = 4001;
const LOCALHOST = "https://localhost:";
let PORT = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true })); //data coming in req get parsed
app.use(over_ride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.send("fine looking site");
});

app.get(
  "/list",
  wrapAsync(async (req, res) => {
    const houseList = await Listing.find({});
    res.render("listinghouse/index.ejs", { houseList });
  })
);

//lists route
app.get(
  "/list/new",
  wrapAsync((req, res) => {
    res.render("listinghouse/newForm.ejs");
  })
);

//create Route
app.post(
  "/list",
  wrapAsync(async (req, res, next) => {
    const newLists = new Listing(req.body.lists);
    if(!newLists.image.url){
      newLists.image.url = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mountainliving.com%2Fthe-top-10-mountain-homes-of-2020%2F&psig=AOvVaw2ix9diBuSp1uvYoXcijdpQ&ust=1707582134936000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKDis6zVnoQDFQAAAAAdAAAAABAI"
    }
    if(!newLists.image.filename){
      newLists.image.filename = "listingimage";
    }
    await newLists.save();
    res.redirect("/list");
  })
);

app.get(
  "/list/:id",
  wrapAsync(async (req, res) => {
    try {
      let { id } = req.params;
      const listing = await Listing.findById(id);
      res.render("./listinghouse/show.ejs", { listing });
    } catch (error) {
      console.log("Error is iq:-", error);
    }
  })
);

//edit Route
app.get(
  "/list/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listinghouse/edit.ejs", { listing });
  })
);

//update Route
app.put(
  "/list/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.lists });
    res.redirect(`/list/${id}`);
  })
);

app.delete(
  "/list/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deleting = await Listing.findByIdAndDelete(id);
    console.log(deleting);
    res.redirect("/list");
  })
);

app.all("*", (req, res, next) => {
  next(new expressError(404, "page not found"));
});

app.use((err, req, res, next) => {
  let { statusCode, message } = err;
  res.status(statusCode).send(message);
  res.send("something went wrong!");
});

app.listen(PORT, () => {
  console.log(`listening this at ${LOCALHOST}${PORT}`);
});
