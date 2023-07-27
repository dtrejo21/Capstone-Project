const mongoose = require('mongoose')
const SubtaskModel = require('./Subtask')

const taskSchema = new mongoose.Schema({
    title: String,
    description: {
        type: String,
        default: ""
    },
    dueDate: {
        type: Date,
        default: Date.now,
    },
    subtask: [SubtaskModel.schema],
    listId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subjects"
    }
})

const TaskModel = mongoose.model("tasks", taskSchema)
module.exports = TaskModel
