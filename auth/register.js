let {secretJWT} = require('../server.js');
const {transporter} = require('../server.js');
const bcrypt = require("bcrypt");
var base;
const jwt = require("jsonwebtoken");
setTimeout(function run() {
    if(base) return;
    var {db} = require('../server.js');
    base = db;
    setTimeout(run, 500);
}, 100);
function register(req, res){

    base.collection('admin').find({email: req.body.email}).toArray((err,respA)=>{
        if (err) return console.log(err)
        if (respA.length == 0) {
            base.collection('users').find({email: req.body.email}).toArray((err,resp)=>{
                console.log(req.body);
                if (err) return console.log(err)
                if (resp.length == 0) {
                    bcrypt.hash(req.body.password, 10, function(err, hash) {
                        base.collection('users').insertOne({
                            'first_name': req.body.first_name,
                            'second_name': req.body.second_name,
                            'password': hash,
                            'email': req.body.email
                        },(err,result)=>{
                            if(err)
                                return res.json({status: "error"});
                            else {
                                res.send("Success");
                            }
                            });
                        });
                } else {
                    res.json({status: "email"});
                }
            });
        } else {
            res.json({status: "email"});
        }
    });
}
module.exports.register = register;