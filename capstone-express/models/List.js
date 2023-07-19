const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
    title: String,
    task: [taskSchema],
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subjects"
    }
})

const ListModel = mongoose.model("list", listSchema)
module.exports = ListModel