const {app, type} = require('../server.js');
const { middleware } = require('../auth/middleware.js');
const {transporter} = require('../server.js');
var base;
setTimeout(function run() {
    if(base) return;
    var {db} = require('../server.js');
    base = db;
    setTimeout(run, 500);
}, 100);
function deleteUser(){
    app.post('/deleteUser', type, middleware, (req, res) => {
        base.collection('users').findOneAndDelete({
            email: req.body.email
        },(err,result)=>{
            if(err)
                return console.log(err);
                return res.send("Success")
        });
    });
}
module.exports.deleteUser = deleteUser;