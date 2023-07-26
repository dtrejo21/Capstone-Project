const mongoose = require("mongoose");

const subtaskSchema = new mongoose.Schema({
  name: String,
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tasks",
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
