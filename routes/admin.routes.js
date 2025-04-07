const { Router } = require('express');
const { adminModel } = require("../db");
const adminRouter = Router();

adminRouter.post("/signup", (req,res) => {
    res.json({
        message: "admin signup"
    })
})

adminRouter.post("/signin", (req,res) => {
    res.json({
        message: "admin signin"
    })
})

adminRouter.post("/course", (req,res) => {
    res.json({
        message: "create a course"
    })
})



module.exports = {
    adminRouter: adminRouter
}