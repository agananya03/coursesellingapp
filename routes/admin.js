const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");
require('dotenv').config();

adminRouter.post('/signup' , function(req , res) {

});

adminRouter.post('/login' , function(req , res) {

});

adminRouter.post('/addcourse' , function(req , res) {

});

adminRouter.put('/addcourse', function(req, res) {

});

adminRouter.get('/addcourses/bulk', function(req, res) {

});

module.exports = {
    adminRouter: adminRouter
};