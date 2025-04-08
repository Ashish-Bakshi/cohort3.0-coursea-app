const express = require('express');
const mongoose = require('mongoose');
const { userRouter } = require('./routes/user.routes');
const { courseRouter } = require('./routes/course.routes');
const { adminRouter } = require('./routes/admin.routes');

const app = express();
app.use(express.json());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);


async function main(){
    await mongoose.connect("mongodb+srv://admin:ashish1234@cluster0.qlonwfg.mongodb.net/coursea");
    console.log("connected to mongodb");
    app.listen(3000);
    console.log("Listening on port 3000 !!!");
}

main();