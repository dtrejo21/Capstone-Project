const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId
    }
})

const UserModel = mongoose.model("users", userSchema)
module.exports = UserModel