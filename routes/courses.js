const { Router } = require("express");
const {usermiddleware} = require("../middlewares/user")
const { purchaseModel, courseModel} = require("../db");
const coursesRouter = Router();

coursesRouter.get('/info' ,async function(req , res) {
    const courses = await courseModel.find({});
    res.json({
        courses
    });
});

coursesRouter.post('/purchase' ,usermiddleware,async function (req , res) {
    const userId = req.userId;
    const courseId = req.body.courseId;
    await purchaseModel.create({
        userId,
        courseId
    });
    res.json({
        message: "ypu have successfully bought the course"
    });
});

module.exports = {
    coursesRouter: coursesRouter
};