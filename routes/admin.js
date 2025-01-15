const { Router } = require("express");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;
const {adminModel, userModel, courseModel } = require("../db");
const { adminMiddleware } = require("../middleware/admin");

const adminRouter = Router();

adminRouter.post("/signup", async function(req, res){
    const adminbody = z.object({
        email : z.string().min(3).max(30).email(),
        password : z.string().min(8).max(20),
        firstname : z.string().max(20),
        lastname : z.string().max(20)
    });

    const result = adminbody.safeParse(req.body);

    if(!result.success){
        res.status(400).json({
            message : "Incorrect Format"
        });
        return
    }

    const {email, password, firstname, lastname} = req.body;

    try{
        const hashedpassword = await bcrypt.hash(password, 5)
        console.log("hashedpassword is :", hashedpassword);

        await adminModel.create({
            email : email,
            password : hashedpassword,
            firstname : firstname,
            lastname : lastname
        });
        return res.status(201).json({
            message : "signup succeeded"
        });
    } catch(e){
        res.status(500).json({
            message : " Signup failed"
    })
}   
})

adminRouter.post("/signin", async function(req, res){

    const {email , password} = req.body;

    const admin = await adminModel.findOne({
        email : email
    });

    console.log("admin is :", admin);

    if (!admin){
        res.status(403).json({
            message : "Admin does not exist"
        });
        return
    };

    const passwordmatch = await bcrypt.compare(password, admin.password);

    if(passwordmatch){
        const token = jwt.sign({
            id : admin._id
        }, JWT_ADMIN_PASSWORD);
        
        res.json({
            token
        });
    } else {
        res.status(403).json({
            message : "Incorrect Credentials"
        });
    }
});

adminRouter.post("/course",adminMiddleware,async function(req, res){
    const CreatorId = req.adminId;

    const {title , description, price, imageUrl} = req.body;

    const course = await courseModel.create({
        title : title,
        description : description,
        price : price,
        imageUrl : imageUrl,
        CreatorId : CreatorId
    })

    res.json({
        message : " Course Created",
        courseId : course._id
    })
})

adminRouter.put("/course", adminMiddleware, async function(req, res){
    const CreatorId = req.adminId;

    const { title, description, price, imageUrl, courseId} = req.body;

    const course = await courseModel.updateOne({
        _id : courseId,
        CreatorId : CreatorId
    } , {
        title : title,
        description : description,
        price : price,
        imageUrl : imageUrl
    })

    res.json({
        message : " Course updated",
        courseId : course._id
    })
})

adminRouter.get("/course/bulk",adminMiddleware,async function(req, res){
    const CreatorId = req.adminId;

    const courses = await courseModel.find({
        CreatorId : CreatorId
    });

    res.json({
        message : " Here are the Courses", 
        courses 
    })
})

module.exports = {
    adminRouter : adminRouter
}