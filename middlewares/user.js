const jwt = require("jsonwebtoken");

function usermiddleware(req, res, next){
    const token = req.headers.token;
    const decodedData = jwt.verify(token, JWT_USER_SECRET);
    if(decodedData) {
        req.userId = decodedData.id;
        next();
    } else {
        res.status(403).json({
            message: "You are signed in"
        });
    }
}

module.exports = {
    usermiddleware: usermiddleware
};