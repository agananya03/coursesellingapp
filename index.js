const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
console.log("connected");
const { userRouter } = require("./routes/user");
const { adminRouter } = require("./routes/admin");
const { coursesRouter } = require("./routes/courses");

const app = express();

app.use("/api/v1/user" , userRouter);
app.use("/api/v1/admin" , adminRouter);
app.use("/api/v1/courses" , coursesRouter);

async function main(){
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, ()=>{
        console.log("Backend is live!");
    })
}

app.listen(3000);