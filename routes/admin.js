const { Router } = require("express");
const adminRouter = Router();
const {adminModel } = require("../db");

adminRouter.post("/signup", function(req, res){
    res.json({
        message : " Admin Signup endpoint"
    })
})

adminRouter.post("/signin", function(req, res){
    res.json({
        message : " Admin Signin endpoint"
    })
})

adminRouter.post("/", function(req, res){
    res.json({
        message : " Admin course creating endpoint"
    })
})

adminRouter.put("/", function(req, res){
    res.json({
        message : " Admin course editing endpoint"
    })
})

adminRouter.get("/bulk", function(req, res){
    res.json({
        message : " Admin course content endpoint"
    })
})

module.exports = {
    adminRouter : adminRouter
}