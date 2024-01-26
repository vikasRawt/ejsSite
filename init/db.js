const mongoose = require("mongoose");
const allData = require("./data.js");
const Listing = require("../models/listing.js");


 const dbConn = async function main(){
try {
    await mongoose.connect(process.env.MONGO_URL);
} catch (error) {
    console.log("error of dbConn",error)
}
}

// const initDb = async()=>{
//     await Listing.deleteMany({});
//     await Listing.insertMany(allData.data);
//     console.log("data added all")
// }

// initDb();

module.exports = dbConn;