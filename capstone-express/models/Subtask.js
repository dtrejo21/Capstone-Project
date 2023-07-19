const mongoose = require('mongoose')

const subtaskSchema = new mongoose.Schema({
    name: String,
    taskId: String
})

const SubtaskModel = mongoose.model("subtasks", subtaskSchema)
module.exports = SubtaskModel