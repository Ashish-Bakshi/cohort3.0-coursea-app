const { Router } = require('express');
const courseRouter = Router();

courseRouter.get("/purchase", (req,res) => {
    res.json({
        message: "purchase courses"
    })
})

courseRouter.get("/preview", (req,res) => {
    res.json({
        message: "all courses"
    })
})

module.exports = {
    courseRouter: courseRouter
}