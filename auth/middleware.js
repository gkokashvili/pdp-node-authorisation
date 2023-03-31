const {secretJWT} = require('../server.js');
const jwt = require("jsonwebtoken");

function middleware(req, res, next) {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.json({message: "Token not provided", role:"guest"})
    }
    console.log(authHeader);
    const token = authHeader.replace('Bearer ', '');
    let currentUser;
    try {
        currentUser = jwt.verify(token, secretJWT);
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({message: "Invalid token", role:"guest"});
            //next(e);
        }
    }
    console.log(currentUser);
    req.user = {
        email: currentUser.email,
        role: currentUser.role
    };
    next();
}

module.exports.middleware = middleware; 
