const express = require('express');
const cors = require('cors');
const db = require('./config/db-connection');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {res.json({message: 'todo list API'})});
app.use('/api/tasks', require('./src/routes/task.route'));

app.listen(port, () => console.log(`Listening on port ${port}`));