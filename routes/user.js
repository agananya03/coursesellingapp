const { Router } =  require("express");

const userRouter = Router();

userRouter.post('/signup' , function(req , res) {

});

userRouter.post('/login' , function(req , res) {

});

userRouter.get('/purchased' , function(req , res) {

});

module.exports = {
    userRouter: userRouter
};