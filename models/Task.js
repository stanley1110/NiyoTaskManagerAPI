const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  task: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
