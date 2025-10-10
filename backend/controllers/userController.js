const Task = require('../models/Task');
const User = require('../models/User');
const bycript = require('bcryptjs');

// @desc Get all users (admin only )
// @route GET /api/users
// @access Private/Admin
const getUsers = async (req, res) => {
    try {
        const users = await User.find({role: 'member'}).select('-password');
        
        // add task count for each user 
        const userWithTaskCount = await Promise.all(users.map(async (user) => {
            const pendingTasks = await Task.countDocuments({ 
                assignedTo: user._id, 
                status: 'Pending' 
            });
            const inProgressTasks = await Task.countDocuments({ 
                assignedTo: 
                user._id, 
                status: 'In Progress' 
            });
            const completedTasks = await Task.countDocuments({ 
                assignedTo: user._id, 
                status: 'Completed' 
            });
                
            return {
                ...user._doc,
                taskCounts: {
                    pending: pendingTasks,
                    inProgress: inProgressTasks,
                    completed: completedTasks
                }
            };
        }));
        res.json(userWithTaskCount);

    }catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
}

// @desc Get user by ID
// @route GET /api/users/:id
// @access Private
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user){
            return res.status(404).json({message: 'User not found'});
        }
        res.json(user);
    }catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
}


module.exports = { getUsers, getUserById}; 
