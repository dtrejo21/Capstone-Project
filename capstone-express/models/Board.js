const mongoose = require('mongoose')
const SubjectModel = require('./Subject')

const boardSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    subjects: [SubjectModel.schema],
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "user"
    }
})

const BoardModel = mongoose.model("boards", boardSchema)
module.exports = BoardModel
