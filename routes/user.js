const { Router } = require("express");
const userRouter = Router();

userRouter.post("/signup", function(req,res){
    res.json({
        Message : "signup Endpoint"
    })
})

userRouter.post("/signin", function(req,res){
    res.json({
        message : "signin Endpoint"
    })
})

userRouter.get("/mycourses", function(req,res){
    res.json({
        message : "mycourses Endpoint"
    })
})

module.exports = {
    userRouter: userRouter
}