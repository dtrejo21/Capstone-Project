const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require('./models/User')
const SubjectModel = require("./models/Subject");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}));

app.use(cookieParser())

const uri = 
"mongodb+srv://dtrejoher:JndqVhqyVTo6VFlz@projectcluster.74xo1an.mongodb.net/?retryWrites=true&w=majority"
async function connect(){
    try{
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    }catch(err){
        console.error(err);
    }
}
connect(); 

app.post('/signup', (req, res) => {
    const {username, email, password} = req.body;
    bcrypt.hash(password, 4)
    .then(hash => {
        UserModel.create({username, email, password: hash})
        .then(response => res.json(response))
        .catch(err => console.log(err))
    }).then(err => console.log(err))
})

app.post('/login', (req, res) => {
    const {username, password} = req.body;
    UserModel.findOne({username: username})
    .then(user => {
        if(user)
        {//does the user exist??
            bcrypt.compare(password, user.password, (err, response) => { 
                if(response)
                {
                    const token = jwt.sign({email: user.email, username: user.username}, "jwt-secret-key", {expiresIn: '365d'})
                    res.cookie('token', token)
                    res.json("Success")
                }
                else
                {
                    res.json("The password is incorrect");
                }
            })
        }
        else
        {
            res.json("User doesn't exist")
        }
    })
})

//used to ensure user's request has a valid token
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token)
    {
        return res.json("The token is missing")
    }
    else
    {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err)
            {
                return res.json("The token is wrong")
            }
            else
            {   req.username = decoded.username;
                req.email = decoded.email;
                next()
            }
        })
    }
}

app.get('/getUser', verifyUser, (req, res) => {
    return res.json({username: req.username, email: req.email})
})

app.post('/createSubject', (req, res) => {
    SubjectModel.create({title: req.body.title})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.get('/getSubject', (req, res) => {
    SubjectModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.listen(8000, () => {
    console.log("Server started on port 8000");
});