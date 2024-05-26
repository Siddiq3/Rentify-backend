const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');
exports.register = async (req, res) => {
    const { firstName, lastName, email, phoneNumber, password, userType } = req.body;
    
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            firstName,
            lastName,
            email,
            phoneNumber,
            password: hashedPassword,
            userType
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during user registration:', error.message);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const secretKey = uuidv4();
console.log(secretKey); // Output: a randomly generated UUID

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

        // Sign JWT token using the same secretKey
        const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });

        // Return user details and token in the response
        res.status(200).json({ result: user, token: `Bearer ${token}` });
    } catch (error) {
        console.error('Error during user login:', error.message);
        res.status(500).json({ message: 'Something went wrong' });
    }
};