const { Router } = require("express");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const { userModel, purchaseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { userMiddleware } = require("../middleware/user");
require("dotenv").config();
const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;

const userRouter = Router();

userRouter.post("/signup", async function(req,res){
    const userbody = z.object({
        email : z.string().min(3).max(30).email(),
        password : z.string().min(8).max(20),
        firstname : z.string().max(20),
        lastname : z.string().max(20)
    })
    
    const result = userbody.safeParse(req.body);
    
    if (!result.success){
        res.status(400).json({
            message : "Incorrect Format",
            error : result.error.errors,
        });
        return
    }

    const {email, password, firstname, lastname} = req.body;

    try{
        const hashedpassword = await bcrypt.hash(password, 5);
        console.log("Hashed Password is :", hashedpassword);

        await userModel.create({
            email : email,
            password : hashedpassword,
            firstname : firstname,
            lastname : lastname
        });

       return res.status(201).json({
            message : "signup Succeeded",
        });
    } catch(e){
    res.status(500).json({
        Message : "signup Failed"
    })
}
})

userRouter.post("/signin", async function(req,res){

    const {email, password} = req.body;

    const user = await userModel.findOne({
        email : email
    });

    console.log(user);

    if(!user){
        res.status(403).json({
            message : "user does not exist"
        })
        return
    }
  

    const passwordmatch = await bcrypt.compare(password, user.password);
    if(passwordmatch){
        const token = jwt.sign({
            id : user._id
        }, JWT_USER_PASSWORD);

    res.json({
        token
    });
    } else {
        res.status(403).json({
            message : "Incorrect Credentials"
        });
    }
    
});

userRouter.get("/mycourses",userMiddleware,async function(req,res){
    const userId = req.userId;

    const mycourses = await purchaseModel.find({
        userId
    })
    res.json({
        mycourses
    })
})

module.exports = {
    userRouter: userRouter
}