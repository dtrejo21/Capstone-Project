const mongoose = require('mongoose')

const boardSchema = new mongoose.Schema({
    title: String,
    subject: [subjectSchema],
    userId: String
})

const BoardModel = mongoose.model("board", boardSchema)
module.exports = BoardModel
