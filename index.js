const express = require('express');
const { userRouter } = require('./routes/user.routes');
const { courseRouter } = require('./routes/course.routes');
const { adminRouter } = require('./routes/admin.routes');

const app = express();

app.use("/api/v1/users", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);



app.listen(3000);