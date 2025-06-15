const { Router } =  require("express");
const { z } = require("zod")
const userRouter = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const { userModel, purchaseModel, courseModel } = require("../db");
const {usermiddleware} = require("../middlewares/user")


const signupSchema = z.object({
    email : z.string().email(),
    password : z.string().min(8),
    firstname : z.string().min(1),
    lastname : z.string().min(1)
});

userRouter.post('/signup' , async function(req , res) {
    const { email, password, firstname, lastname } = req.body;
         signupSchema.safeParse(req.body);
    try{
       // signupSchema.safeParse(email);//verifying the input using zod
         signupSchema.safeParse(req.body);
        const hashedPassword = await bcrypt.hash(password, 10); // hashing password using bcrypt
         await userModel.create({ //adding to database user
            email : email,
            password : hashedPassword,
            firstname : firstname,
            lastname : lastname
        });
        res.status(201).json({
            message : "User created successfully!"
        });
    }
    catch(e){
        // Handle Zod validation errors
        if (e instanceof z.ZodError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: e.errors// Send the validation errors
            });
        }

        console.log("Error occurred: ",e);
        res.status(501).json({
            message : "Error creating user",
            error: e.message
        })
    }
});

userRouter.post('/login' , async function(req , res) {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({email}); // checking if the email exists
        if(!user){
            return res.json({
                message: "User not found!"
            })
         }
           const isPasswordValid =await bcrypt.compare(password, user.password); // checking if password matches
            if(!isPasswordValid){
                return res.json({
                    message: "Password is incorrect!"
                })
            }
             const token = jwt.sign({ //returning the jwt to user
             id : user._id
                },process.env.JWT_USER_SECRET)
                
                res.json({
                    message : "User signin successful",
                    token : token
                });
        }
        catch (e){
            console.error("Error during sign-in:", e);
            res.status(500).json({
            message: "Error during sign-in",
            error: e.message,
        });
        }
});

userRouter.get('/purchased' , async function(req , res) {
    const userId = req.userId;
    const purchases = await purchaseModel.find({
        userId
    })
    const courseData = await courseModel.find({
        _id : {$in : purchases.map(x => x.courseId)}
    })
    res.json({
        purchases,
        courseData
    })
});

module.exports = {
    userRouter: userRouter
};