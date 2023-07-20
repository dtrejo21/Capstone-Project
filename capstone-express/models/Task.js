const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    label: String,
    dueDate: Date,
    subtask: [subtaskSchema],
    listId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subjects"
    }
})

const TaskModel = mongoose.model("tasks", taskSchema)
module.exports = TaskModel
