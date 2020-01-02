const express = require('express');
require('./db/mongoose');
const user_router = require('./routes/user');
const task_router = require('./routes/task');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(user_router);
app.use(task_router);

app.listen(port, () => {
  console.log('Server is up on port', port);
});
