const mongoose = require('mongoose')

const boardSchema = new mongoose.Schema({
    title: String,
    subject: [subjectSchema],
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "user"
    }
})

const BoardModel = mongoose.model("boards", boardSchema)
module.exports = BoardModel
