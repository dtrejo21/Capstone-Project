const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require('./routes/User')

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
/*
app.post('/login', (req, res) => {

})*/

app.listen(8000, () => {
    console.log("Server started on port 8000");
});