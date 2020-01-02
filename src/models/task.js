const mongoose = require('mongoose');

const task_schema = new mongoose.Schema(
  {
    description: {
      required: true,
      trim: true,
      type: String
    },
    completed: {
      default: false,
      type: Boolean
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  { timestamps: true }
);

const Task = new mongoose.model('Task', task_schema);

module.exports = Task;
