const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require('./routes/User')
const SubjectModel = require("./routes/Subject");

const app = express();

app.use(express.json())
app.use(cors())

const uri = 
"mongodb+srv://dtrejoher:JndqVhqyVTo6VFlz@projectcluster.74xo1an.mongodb.net/?retryWrites=true&w=majority"

async function connect(){
    try{
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    }catch(err){
        console.err(err);
    }
}
connect(); 

app.post('/signup', (req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post('/login', (req, res) => {
    const {username, password} = req.body;
    UserModel.findOne({username: username})
    .then(user => {
        if(user){//does the user exist??
            if(user.password === password){
                res.json("Success")
            }
            else
            {
                res.json("The password is incorrect")
            }
        }
        else
        {
            res.json("User doesn't exist")
        }
    })
})

app.get('/getUser', (req, res) => {
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