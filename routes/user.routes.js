const { Router } = require('express');
const userRouter = Router();

userRouter.post("/signup", (req,res) => {
    res.json({
        message: "signup"
    })
})

userRouter.post("/signin", (req,res) => {
    res.json({
        message: "signin"
    })
})

userRouter.get("/purchases", (req,res) => {
    res.json({
        message: "users courses"
    })
})

module.exports = {
    userRouter: userRouter
}