'use strict';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './user.model.js';

export const registerUser = async (req, res) => {
    try {
        const { name, username, password, role } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).send({ message: 'Username already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, username, password: hashedPassword, role });
        await user.save();

        const token = generateAuthToken(user);
        res.status(201).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error registering user' });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send({ message: 'Invalid username or password' });
        }

        const token = generateAuthToken(user);
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error logging in' });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error getting users' });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error getting user' });
    }
};

export const updateUserById = async (req, res) => {
    try {
        const { name, username, role } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { name, username, role }, { new: true });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error updating user' });
    }
};

export const deleteUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error deleting user' });
    }
};

const generateAuthToken = (user) => {
    const token = jwt.sign({ _id: user._id, role: user.role }, 'secretKey');
    return token;
};
