require("dotenv").config({path:"../.env"});
const express = require("express");

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get("/", async(req, res)=>{
    
    res.json({message:"Hello, It's me! I've been wondering if after all these years you would like to meet"})
})

app.listen(8080, ()=>{
    console.log("Server listening at port 8080");
});