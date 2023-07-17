const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
    title: String
})

const SubjectModel = mongoose.model("subjects", subjectSchema)
module.exports = SubjectModel