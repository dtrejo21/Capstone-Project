const mongoose = require('mongoose')
const TaskModel = require('./Task')

const listSchema = new mongoose.Schema({
    title: {
        type: String, 
    },
    task: [TaskModel.schema],
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subjects"
    }
})

const ListModel = mongoose.model("list", listSchema)
module.exports = ListModel