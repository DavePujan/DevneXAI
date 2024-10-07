const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).send({ message: 'Username and password are required' });
    }

    if (password.length < 6) {
        return res.status(400).send({ message: 'Password must be at least 6 characters long' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send({ message: 'Username already exists' });
        }

        // Create new user
        const newUser = new User({ username, password });
        await newUser.save();

        res.status(200).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Server error, please try again later' });
    }
});

module.exports = router;
