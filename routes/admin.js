const { Router } = require("express");
const adminRouter = Router();

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

adminRouter.post("/course", function(req, res){
    res.json({
        message : " Admin course creating endpoint"
    })
})

adminRouter.put("/course", function(req, res){
    res.json({
        message : " Admin course editing endpoint"
    })
})

adminRouter.get("/course/bulk", function(req, res){
    res.json({
        message : " Admin course content endpoint"
    })
})

module.exports = {
    adminRouter : adminRouter
}