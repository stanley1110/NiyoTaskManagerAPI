const Task = require("../models/Task");
const userservice = require("../service/userService");
const { io } = require("../helper/socket");

const createTask = async (req, res) => {
  try {
    const { task, description } = req.body;
    const { userid, email } = req.user;
    const completed = false;
    if (userservice.ValidateUser(email)) {
      const taskobj = new Task({ userid, task, description, completed });
      await taskobj.save();
      io.emit("createTask", taskobj);
      res.status(201).send({ taskobj, message: "Task created successfully" });
    }
  } catch (err) {
    res.status(500).send(`Internal Server error`);
  }
};

const getAllTasks = async (req, res) => {
  try {
    const { userid, email } = req.user;
    const task = await Task.find({}).then((items) => {
      return items.filter((item) => item.userid === userid);
    });
    Object.values(task).length > 1
      ? res.status(200).send({ task, message: "Task fetched successfully" })
      : res.status(404).send({ message: "You have no tasks" });
  } catch (err) {
    res.status(500).send(`Internal Server error`);
  }
};

const getTasksbyId = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);
    task
      ? res.status(200).send({ task, message: "Task fetched successfully" })
      : res.status(404).send({ message: "task does not exist" });
  } catch (err) {
    res.status(500).send(`Internal Server error`);
  }
};

const deleteTaskbyId = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findByIdAndDelete(id);

    task
      ? res.status(200).send({ message: "Task deleted successfully" })
      : res.status(404).send({ message: "Task does not exist" });
  } catch (err) {
    res.status(500).send(`Internal Server error`);
  }
};

const updateTaskbyId = async (req, res) => {
  try {
    const id = req.params.id;
    const { task, description, completed } = req.body;
    const { userid } = req.user;
    const taskresult = await Task.findByIdAndUpdate(id, {
      userid,
      task,
      description,
      completed,
    });
    if (taskresult) {
      io.emit("updateTask", taskresult);
      res.status(200).send({ message: "Task updated successfully" });
    } else {
      res.status(404).send({ message: "Task does not exist" });
    }
  } catch (err) {
    res.status(500).send(`Internal Server error`);
  }
};

module.exports = {
  getTasksbyId,
  createTask,
  deleteTaskbyId,
  getAllTasks,
  updateTaskbyId,
};
