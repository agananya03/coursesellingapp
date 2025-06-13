const express = require("express");
const { userRouter } = require("./routes/user");
const { adminRouter } = require("./routes/admin");
const { coursesRouter } = require("./routes/courses");

const app = express();
console.log("userRouter:", userRouter);
console.log("adminRouter:", adminRouter);
console.log("coursesRouter:", coursesRouter);

app.use("/api/v1/user" , userRouter);
app.use("/api/v1/admin" , adminRouter);
app.use("/api/v1/courses" , coursesRouter);

app.listen(3000);