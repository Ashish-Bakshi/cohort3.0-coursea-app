const express = require('express');
const { userRouter } = require('./routes/user.routes');
const { courseRouter } = require('./routes/course.routes');

const app = express();

app.use("/users", userRouter);
app.use("/course", courseRouter);




app.listen(3000);