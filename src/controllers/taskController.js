const Task = require('../models/task');

exports.createTask = (req, res) => {
  const { description, priority } = req.body;
  const userId = req.user.id;
  Task.create(userId, description, priority, (err, taskId) => {
    if (err) {
      return res.status(400).json({ message: 'Error creating task' });
    }
    res.status(201).json({ id: taskId });
  });
};

exports.getPendingTasks = (req, res) => {
  const userId = req.user.id;
  Task.findByUserId(userId, (err, tasks) => {
    if (err) {
      return res.status(400).json({ message: 'Error fetching tasks' });
    }
    res.json(tasks);
  });
};