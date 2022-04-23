const mongoose = require('mongoose');

let taskSchema = mongoose.Schema({

    idUser: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String
    },
    createdAt: {
        type: Number,
        required: true
    },
    timeEstimate: {
        type: Number
    },
    starTime: {
        type: Number,
    },
    endTime: {
        type: Number,
    },
    imageURL: {
        type: String
    },
    completed: {
        type: Boolean,
    },
});

let Task = mongoose.model("task", taskSchema);

module.exports = Task;