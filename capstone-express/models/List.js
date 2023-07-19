const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
    title: String,
    task: [taskSchema],
    subjectId: String
})

const ListModel = mongoose.model("list", listSchema)
module.exports = ListModel