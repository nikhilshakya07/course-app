const { Router } = require("express");
const courseRouter = Router();

 courseRouter.post("/purchace", function(req,res){
    res.json({
        message : "payment page Endpoint"
    })
})

courseRouter.get("/preview", function(req,res){
    res.json({
        message : "all courses preview Endpoint"
    })
})

module.exports = {
    courseRouter: courseRouter
}