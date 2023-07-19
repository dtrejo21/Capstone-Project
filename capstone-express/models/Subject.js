const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
    title: String,
    boardId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "boards"
    }
})

const SubjectModel = mongoose.model("subjects", subjectSchema)
module.exports = SubjectModel