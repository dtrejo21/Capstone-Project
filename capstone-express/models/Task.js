const mongoose = require('mongoose')
const SubtaskModel = require('./Subtask')

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    label: String,
    dueDate: Date,
    subtask: [SubtaskModel.schema],
    listId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subjects"
    }
})

const TaskModel = mongoose.model("tasks", taskSchema)
module.exports = TaskModel
