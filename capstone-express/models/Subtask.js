const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const subtaskSchema = new mongoose.Schema(
  {
    subtaskTitle: String,
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tasks",
    },
    description: {
      type: String,
      default: "",
    },
    dueDate: {
      type: Date,
      default: null,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const SubtaskModel = mongoose.model("subtasks", subtaskSchema);
module.exports = SubtaskModel;
