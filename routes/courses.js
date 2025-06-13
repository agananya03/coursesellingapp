const { Router } = require("express");

const coursesRouter = Router();

coursesRouter.get('/info' , function(req , res) {

});

coursesRouter.post('/purchase' , function (req , res) {

});

module.exports = {
    coursesRouter: coursesRouter
};