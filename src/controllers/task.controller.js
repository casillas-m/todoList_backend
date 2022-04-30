const taskSchema = require('../models/task.model');

const createTask = async (req, res) => {
    //A function that receives a request with the parameters needed to create a new task and stores it in the database
    const idUser = req.mail;
    const { title, text, timeEstimate, starTime, endTime, imageURL } = req.body;
    if(!title) return res.status(400).json({ message: 'missing required info' });
    try {
        let lastTask = await taskSchema.findOne({ idUser: idUser }, {}, { sort: { 'createdAt': -1 } });
        let priority = lastTask ? lastTask.priority + 1 : 1;
        const newTask = new taskSchema({
            idUser,
            priority,
            title,
            text: text ? text : '',
            createdAt: Date.now(),
            timeEstimate: timeEstimate ? timeEstimate : 0,
            starTime: starTime ? starTime : 0,
            endTime: endTime ? endTime : 0,
            imageURL: imageURL ? imageURL : "",
            completed: false
        });
        let result = await newTask.save();
        if(result) {
            return res.status(201).send({message: 'Task created' });
        } else {
            console.log("result");
            throw "Could not create task!";
        }  
    } catch (error) {
        return res.status(500).send({ message: error.toString() });
    }
}

const getTasks = async (req, res) => {
    //A function that receives a request with the idUser and returns all the tasks of that user
    const idUser = req.mail;
    if(!idUser) return res.status(400).json({ message: 'missing required info' });
    try {
        let tasks = await taskSchema.find({ idUser: idUser });
        if(tasks) {
            return res.status(200).send({ tasks });
        }
        throw "Could not get tasks!";
    } catch (error) {
        return res.status(500).send({ message: error.toString() });
    }
}

const editTask = async (req, res) => {
    //A function that receives a request with the id of the task to edit and the new values and updates the task
    const idUser = req.mail;
    const { idTask, title, text, timeEstimate, starTime, endTime, imageURL } = req.body;
    if(!idTask) return res.status(400).json({ message: 'missing required info' });
    try {
        let task = await taskSchema.findOne({ _id: idTask });
        if(task) {
            if(task.idUser != idUser) return res.status(401).send({ message: 'Unauthorized' });
            task.title = title ? title : task.title;
            task.text = text ? text : task.text;
            task.timeEstimate = timeEstimate ? timeEstimate : task.timeEstimate;
            task.starTime = starTime ? starTime : task.starTime;
            task.endTime = endTime ? endTime : task.endTime;
            task.imageURL = imageURL ? imageURL : task.imageURL;
            let result = await task.save();
            if(result) {
                return res.status(200).send({message: 'Task edited' });
            } else {
                throw "Could not edit task!";
            }
        } else {
            throw "Task not found!";
        }
    } catch (error) {
        return res.status(500).send({ message: error.toString() });
    }
}

//Falta que se recalculen las prioridades
const deleteTask = async (req, res) => {
    //A function that receives a request with the id of the task to delete and deletes it
    const idUser = req.mail;
    const { idTask } = req.query;
    if(!idTask) return res.status(400).json({ message: 'missing required info' });
    try {
        let task = await taskSchema.findOne({ _id: idTask });
        if(task) {
            if(task.idUser != idUser) return res.status(401).send({ message: 'Unauthorized' });
            let result = await task.remove();
            if(result) {
                return res.status(200).send({message: 'Task deleted' });
            } else {
                throw "Could not delete task!";
            }
        } else {
            throw "Task not found!";
        }
    } catch (error) {
        return res.status(500).send({ message: error.toString() });
    }
}

//Falta crear función para cambiar y actualizar las prioridades

module.exports = {
    createTask,
    getTasks,
    editTask,
    deleteTask
}