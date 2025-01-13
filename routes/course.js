const {Router} = require("express");
const CourseRouter = Router();

 CourseRouter.get("/purchace", function(req,res){
    res.json({
        Message : "paymen page Endpoint"
    })
})

CourseRouter.get("/preview", function(req,res){
    res.json({
        Message : "all courses preview Endpoint"
    })
})

module.exports = {
    CourseRouter : CourseRouter
}