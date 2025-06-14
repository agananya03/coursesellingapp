const jwt = require("jsonwebtoken");

function adminmiddleware(req, res, next){
    const token = req.headers.token;
    const decodedData = jwt.verify(token, JWT_ADMIN_SECRET);
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
    adminmiddleware: adminmiddleware
};