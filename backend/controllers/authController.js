const User = require('../models/User');
const bycript = require('bcryptjs');
const jwt = require('jsonwebtoken');

// generate JWT
const generateToken = (userId) => {
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: '7d'});
};

// @desc Register a new user
// @route POST /api/auth/register
// @access Public
const registerUser = async (req, res) => {
    try {
        const {name, password, email, profileImageUrl, adminInviteToken} = req.body;
        // check if user exists
        const userExists = await User.findOne({email});
        if (userExists) {
            return res.status(400).json({message: 'User already exists'});
        }

        // determine user role : if admin if correct token is provided, otherwise member
        let role = 'member';
        if(adminInviteToken && adminInviteToken === process.env.ADMIN_INVITE_TOKEN) {
            role = 'admin';
        }

        // hash password
        const salt = await bycript.genSalt(10);
        const hashedPassword = await bycript.hash(password, salt);
        
        // create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl,
            role,
        });

        // return user data with JWT
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        });

    }catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
}

// @desc Login user
// @route POST /api/auth/login
// @access Public
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if (!user){
            return res.status(401).json({message: 'Invalid email or password'});
        }
        // compare password
        const ismatch = await bycript.compare(password, user.password);
        if (!ismatch){
            return res.status(401).json({message: 'Invalid email or password'});
        }
        // return user data with jwt
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id)
        })
    }catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
}

// @desc Get user profile
// @route GET /api/auth/profile
// @access Private
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user){
            return res.status(404).json({message: 'User not found'});
        }
        res.json(user);
    }catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
}

// @desc Update user profile
// @route PUT /api/auth/profile
// @access Private
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user){
            return res.status(404).json({message: 'User not found'});
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password){
            const salt = await bycript.genSalt(10);
            user.password = await bycript.hash(req.body.password, salt);
        }

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            profileImageUrl: updatedUser.profileImageUrl,
            token: generateToken(updatedUser._id)
        });
    }catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile
}