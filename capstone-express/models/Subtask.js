const mongoose = require("mongoose");

const subtaskSchema = new mongoose.Schema({
  subtaskTitle: String,
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tasks",
  },
  dueDate: {
    type: Date,
    default: Date.now,
  },
  subtask: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subtasks",
    },
  ],
});

const SubtaskModel = mongoose.model("subtasks", subtaskSchema);
module.exports = SubtaskModel;
