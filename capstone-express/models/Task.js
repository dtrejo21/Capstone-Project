const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    label: String,
    dueDate: Date,
    subtask: [subtaskSchema],
    listId: String
})

const TaskModel = mongoose.model("tasks", taskSchema)
module.exports = TaskModel
