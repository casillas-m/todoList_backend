const userSchema = require('../models/user.model');

const createUser = async (req, res) => {
    const { name, password, mail} = req.body;
    if(!name || !password ||!mail) return res.status(400).json({ message: 'missing required info' });
    try {
        const newUser = new userSchema({
            name,
            password,
            mail
        });
        let result = await newUser.save();
        if(result) {
            return res.status(201).send({message: 'User created' });
        } else {
            throw "Could not create user!";
        }  
    } catch (error) {
        return res.status(500).send({ message: error.toString() });
    }
}

const getUser = async (req, res) => {
    //A function that returns a user name and id by its mail
    const { mail } = req.query;
    if(!mail) return res.status(400).json({ message: 'missing required info' });
    try {
        let result = await userSchema.findOne({ mail });
        if(result) {
            return res.status(200).send({ name: result.name, id: result._id });
        } else {
            throw "Could not find user!";
        }
    } catch (error) {
        return res.status(500).send({ message: error.toString() });
    }
}

const editUser = async (req, res) => {
    //A function that edits a user name or password by its mail
    const { mail, name, password } = req.body;
    if(!mail) return res.status(400).json({ message: 'missing required info' });
    try {
        let result = await userSchema.findOne({ mail });
        if(result) {
            if(name) result.name = name;
            if(password) result.password = password;
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
    const { mail } = req.query;
    if(!mail) return res.status(400).json({ message: 'missing required info' });
    try {
        let result = await userSchema.findOne({ mail });
        if(result) {
            await result.remove();
            return res.status(200).send({ message: 'User deleted' });
        } else {
            throw "Could not find user!";
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
}