const { Router } = require('express');
const courseRouter = Router();
const { userMiddleware } = require('../middlewares/user.middleware');
const { purchaseModel, courseModel } = require('../db');

courseRouter.get("/purchase", userMiddleware , async (req,res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;

    await purchaseModel.create({
        userId,
        courseId
    })

    res.json({
        message: "you have successfully bought the course !!!"
    })
})

courseRouter.get("/preview", async (req,res) => {

    const courses = await courseModel.find({

    })

    res.json({
        courses: courses
    })
})

module.exports = {
    courseRouter: courseRouter
}