const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['Planning', 'Active', 'On Hold', 'Completed', 'Cancelled'],
            default: 'Planning'
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        teamMembers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        priority: {
            type: String,
            enum: ['Low', 'Medium', 'High'],
            default: 'Medium'
        },
        budget: {
            type: Number,
            default: 0
        },
        progress: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Project', projectSchema);
