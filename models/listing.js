const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
      filename: String,
      url:String   
     },
  price: String,
  location: String,
  country: String,
});

const Listing = mongoose.model("houselist", houseSchema);
module.exports = Listing;
