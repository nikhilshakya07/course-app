const {Router} = require("express");
const UserRouter = Router();

UserRouter.post("/signup", function(req,res){
    res.json({
        Message : "signup Endpoint"
    })
})

UserRouter.post("/signin", function(req,res){
    res.json({
        Message : "signin Endpoint"
    })
})

UserRouter.get("/mycourses", function(req,res){
    res.json({
        Message : "mycourses Endpoint"
    })
})

module.exports = {
    UserRouter : UserRouter
}