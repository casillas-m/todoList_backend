const userSchema = require('../models/user.model');
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
    const { name, password, mail } = req.body;
    if (!name || !password || !mail) return res.status(400).json({ message: 'missing required info' });
    try {
        const existingUser = await userSchema.findOne({ mail });
        if (existingUser) return res.status(409).json({ message: 'mail already exists' });
        const newUser = new userSchema({
            name,
            password: bcryptjs.hashSync(password, 10),
            mail: mail.toLowerCase()
        });
        let result = await newUser.save();
        if (result) {
            return res.status(201).send({ message: 'User created' });
        } else {
            throw "Could not create user!";
        }
    } catch (error) {
        return res.status(500).send({ message: error.toString() });
    }
}

const getUser = async (req, res) => {
    //A function that returns a user name and id by its mail
    const { mail } = req;
    if (!mail) return res.status(400).json({ message: 'missing required info' });
    try {
        let result = await userSchema.findOne({ mail });
        if (result) {
            return res.status(200).send({ name: result.name });
        } else {
            throw "Could not find user!";
        }
    } catch (error) {
        return res.status(500).send({ message: error.toString() });
    }
}

const editUser = async (req, res) => {
    //A function that edits a user name or password by its mail
    const { mail } = req;
    const { name, password } = req.body;
    const token = req.headers.authorization;
    if (!token) return res.status(400).json({ message: 'missing required info' });
    try {
        let result = await userSchema.findOne({ mail });
        if (result) {
            if (name) result.name = name;
            if (password) result.password = password;
            await result.save();
            return res.status(200).send({ message: 'User edited' });
        } else {
            throw "Could not find user!";
        }
    } catch (error) {
        return res.status(500).send({ message: error.toString() });
    }
}

const deleteUser = async (req, res) => {
    //A function that deletes a user by its mail
    const { mail } = req;
    if (!mail) return res.status(400).json({ message: 'missing required info' });
    try {
        let result = await userSchema.findOne({ mail });
        if (result) {
            await result.remove();
            return res.status(200).send({ message: 'User deleted' });
        } else {
            throw "Could not find user!";
        }
    } catch (error) {
        return res.status(500).send({ message: error.toString() });
    }
}

const login = async (req, res) => {
    //A function that receives a request with the email and password and returns the token
    const { mail, password } = req.body;
    if (!mail || !password) return res.status(400).json({ message: 'missing required info' });
    try {
        let user = await userSchema.findOne({ mail });
        if (user) {
            let result = await bcryptjs.compare(password, user.password);
            if (result) {
                let authorization = jwt.sign({ mail }, process.env.SECRET_KEY);
                return res.status(200).send({ authorization });
            } else {
                throw "Wrong password!";
            }
        } else {
            throw "User not found!";
        }
    } catch (error) {
        return res.status(500).send({ message: error.toString() });
    }
}


module.exports = {
    createUser,
    getUser,
    editUser,
    deleteUser,
    login,
}