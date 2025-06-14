const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
app.use(express.json()); 

const { userRouter } = require("./routes/user");
const { adminRouter } = require("./routes/admin");
const { coursesRouter } = require("./routes/courses");

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/courses", coursesRouter);

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(3000, () => {
        console.log("listening to assigned port");
    });
}

main();
