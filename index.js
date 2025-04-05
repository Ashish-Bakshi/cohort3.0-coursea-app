const express = require('express');

const app = express();

app.post("/users/signup", (req,res) => {
    res.json({
        message: "signup"
    })
})

app.post("/users/signin", (req,res) => {
    res.json({
        message: "signin"
    })
})

app.get("/users/purchases", (req,res) => {
    res.json({
        message: "users courses"
    })
})

app.get("/course/purchase", (req,res) => {
    res.json({
        message: "purchase courses"
    })
})

app.get("/courses", (req,res) => {
    res.json({
        message: "all courses"
    })
})


app.listen(3000);