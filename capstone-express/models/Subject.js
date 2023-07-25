const mongoose = require('mongoose')
const ListModel = require('./List')

const subjectSchema = new mongoose.Schema({
    subjectTitle: String,
    list: [ListModel.schema],
    boardId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "boards"
    }
})

const SubjectModel = mongoose.model("subjects", subjectSchema)
module.exports = SubjectModel