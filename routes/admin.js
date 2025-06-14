const { Router } = require("express");
const adminRouter = Router();
const { z } = require("zod")
const { adminModel, courseModel } = require("../db");
require('dotenv').config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {adminmiddleware} = require("../middlewares/admin")

const signupSchema = z.object({
    email : z.string().email(),
    password : z.string().min(8),
    firstname : z.string().min(1),
    lastname : z.string().min(1)
});

adminRouter.post('/signup' , async function(req , res) {
     const { email, password, firstname, lastname } = req.body;
        try{
            signupSchema.safeParse(req.body);//verifying the input using zod
    
            const hashedPassword = await bcrypt.hash(password, 10); // hashing password using bcrypt
             await adminModel.create({ //adding to database user
                email : email,
                password : hashedPassword,
                firstname : firstname,
                lastname : lastname
            });
            res.status(201).json({
                message : "Admin created successfully!"
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

adminRouter.post('/login' ,async function(req , res) {
    const { email, password } = req.body;
        try {
            const admin = await adminModel.findOne({email}); // checking if the email exists
            if(!admin){
                return res.json({
                    message: "Admin not found!"
                })
             }
               const isPasswordValid = bcrypt.compare(password, admin.password); // checking if password matches
                if(!isPasswordValid){
                    return res.json({
                        message: "Password is incorrect!"
                    })
                }
                 const token = jwt.sign({ //returning the jwt to admin
                 id : admin._id
                    },process.env.JWT_ADMIN_SECRET) 
                    
                    res.json({
                        message : "Admin signin successful",
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

adminRouter.post('/addcourse' ,adminmiddleware,async function(req , res) {
    const adminId = req.userId;
    const { title, description, imageurl, price} = req.body;
    try{
    const course = await courseModel.create({
        title: title,
        description: description,
        imageurl: imageurl,
        price: price,
        creatorId: adminId
    });
    res.json({
        message: "Course created",
        courseId: course._id
        })
    } catch(e){
        console.log("Some error occurred: ",e);
        res.json({
            message : "Some error occurred!",
            error: error.message
        });
    }
});

adminRouter.put('/addcourse',adminmiddleware,async function(req, res) {
    const adminId = req.adminId;
      const {title, description, imageurl, price, courseId} = req.body;
       const course = await courseModel.updateOne({
        _id: courseId,
        creatorId : adminId 
    },{
        title: title,
        description: description,
        imageurl : imageurl,
        price : price
    })

    res.json({
        message : "Course updated",
        courseId : course._id
    })
});

adminRouter.get('/addcourses/bulk',adminmiddleware, async function(req, res) {
    const adminId = req.userId;
       const courses = await courseModel.updateOne({
        creatorId : adminId 
    });

    res.json({
        message : "Course updated",
        courses
    })
});

module.exports = {
    adminRouter: adminRouter
};