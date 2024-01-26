const express = require("express");
const app = express();
const dotenv = require("dotenv");
const dbConn = require("./init/db");

dotenv.config();

dbConn();

// const PORT = 4001;
const LOCALHOST = 'https://localhost:';
let PORT = process.env.PORT;

app.get('/',(req,res)=>{
    res.send("fine looking site");
})




app.listen(PORT,()=>{
    console.log(`listening this at ${LOCALHOST}${PORT}`)
})