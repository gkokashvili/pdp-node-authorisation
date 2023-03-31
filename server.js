const express = require('express');
let multer = require('multer');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors');
const PORT = process.env.PORT || 5000;
const secretJWT = "practicePdp";
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fetchUrl = require("fetch").fetchUrl;
module.exports.app = app;
module.exports.secretJWT = secretJWT;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let upload = multer();
var type = upload.single('file');
module.exports.type = type;

var dbMongo;
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb+srv://kokasha:Kokasha@cluster0.0gbwhp0.mongodb.net/?retryWrites=true&w=majority', function (err, client) {
    if (err)
        return console.log(err);
    dbMongo = client.db('cluster0');
    module.exports.db = dbMongo;
   
});

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}`);
});

const { middleware } = require('./auth/middleware.js');

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const {startDataUpdate} = require("./dataUpdate/startDataUpdate.js");
const {startDataGet} = require("./dataGet/startDataGet.js");
const {startDataDelete} = require("./dataDelete/startDataDelete.js");
const {signIn} = require('./auth/sign_in.js');
const {register} = require('./auth/register.js');
const {checkUser} = require('./auth/checkUser.js');



startDataUpdate();
startDataGet();
startDataDelete();

console.log(111)

app.post("/signIn", type,  signIn);
app.post("/register", type,  register);
app.post("/checkUser", type, checkUser);
