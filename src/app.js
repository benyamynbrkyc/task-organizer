const express = require('express');
require('./db/mongoose');
const user_router = require('./routes/user');
const task_router = require('./routes/task');

const app = express();

app.use(express.json());
app.use(user_router);
app.use(task_router);

module.exports = app;
