const { Router } = require('express');
const { userModel, courseModel, purchaseModel } = require("../db");
const bcrypt = require('bcrypt');
const userRouter = Router();
const { z } = require('zod');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_USER } = require('../config');
const { userMiddleware } = require('../middlewares/user.middleware');

userRouter.post("/signup", async (req,res) => {
    const requiredBody = z.object({
        email: z.string().min(3).max(100).email(),
        password: z.string().min(3).max(30),
        firstName: z.string().min(3).max(10),
        lastName: z.string().min(3).max(10),
    })

    const parsedDataSafe = requiredBody.safeParse(req.body);

    if(!parsedDataSafe.success){
        res.status(400).json({
            message: "Incorrect Format..",
            error: parsedDataSafe.error
        })
        return
    }

    const { email, password, firstName, lastName } = parsedDataSafe.data;
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await userModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })
    } catch (error) {
        res.json({
            message: "signup failed !!"
        });
        return;
    }
    res.json({
        message: "signup successful !!",
    })
})

userRouter.post("/signin", async (req,res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({
        email: email
    });

    if(!user){
        res.json({
            message: "user does not exist.."
        })
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if(passwordMatch){
        const token = jwt.sign({
            id: user._id.toString()
        }, JWT_SECRET_USER);
        res.json({
            token: token
        })
    }else{
        res.status(403).json({
            message: "Invalid Credentials"
        })
    }

    res.json({
        message: "signin successful !!!"
    })
})

userRouter.get("/purchases", userMiddleware, async (req,res) => {

    const userId = req.userId;
    const purchases = await purchaseModel.find({
        _id: userId
    })

    res.json({
        message: "users courses",
        courses: purchases
    })
})

module.exports = {
    userRouter: userRouter
}