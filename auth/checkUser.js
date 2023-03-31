const {secretJWT} = require('../server.js');
const jwt = require("jsonwebtoken");

function checkUser(req, res){
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.json({message: "Token not provided", role:"guest"})
    }
    const token = authHeader.replace('Bearer ', '');
    let currentUser;
    try {
        currentUser = jwt.verify(token, secretJWT);
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({role: "guest"});
            //next(e);
        }else{
            return res.status(200).json({role: "user"});
        }
    }
    res.json("user");
}
module.exports.checkUser = checkUser;