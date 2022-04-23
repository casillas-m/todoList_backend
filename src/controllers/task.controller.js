const taskSchema = require('../models/task.model');

const createTask = async (req, res) => {
    //A function that receives a request with the parameters needed to create a new task and stores it in the database
    const { idUser, title, text, timeEstimate, starTime, endTime, imageURL } = req.body;
    if(!idUser || !title) return res.status(400).json({ message: 'missing required info' });
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


module.exports = {
    createTask,
}

