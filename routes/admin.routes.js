const { Router } = require('express');
const bcrypt = require('bcrypt');
const { z } = require('zod');
const jwt = require('jsonwebtoken');
const { adminModel, courseModel } = require("../db");
const adminRouter = Router();
const { JWT_SECRET_ADMIN } = require('../config');
const { adminMiddleware } = require('../middlewares/admin.middleware');

adminRouter.post("/signup", async (req,res) => {
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
            await adminModel.create({
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

adminRouter.post("/signin", async (req,res) => {
    const { email, password } = req.body;
        const admin = await adminModel.findOne({
            email: email
        });

        if(!admin){
            res.json({
                message: "user does not exist.."
            })
        }
    
        const passwordMatch = await bcrypt.compare(password, admin.password);
    
        if(passwordMatch){
            const token = jwt.sign({
                id: admin._id.toString()
            }, JWT_SECRET_ADMIN);
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

adminRouter.post("/course", adminMiddleware , async (req,res) => {
    const adminId = req.userId;

    const { title, description, imageUrl, price } = req.body;

    await courseModel.create({
        title: title, 
        description: description, 
        imageUrl: imageUrl, 
        price: price,
        creatorId: adminId 
    });

    res.json({
        message: "course created",
        courseId: course._id
    })
})

adminRouter.put("/course", adminMiddleware, async (req, res) => {
    const adminID = req.userId;

    const { title, description, imageUrl, price } = req.body;

    await courseModel.updateOne({
        _id: courseId,
        creatorId: adminID 
    }, {
        title: title, 
        description: description, 
        imageUrl: imageUrl, 
        price: price,
    });    
})

adminRouter.get("/course/bulk", adminMiddleware, async (req, res) => {
    const adminID = req.userId;
    const courses = await courseModel.find({
        creatorId: adminID
    });

    res.json({
        message: "course updated",
        courses: courses
    })
})

module.exports = {
    adminRouter: adminRouter
}