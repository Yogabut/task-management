const Project = require('../models/Project');
const Task = require('../models/Task');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private
const getProjects = async (req, res) => {
    try {
        const { status } = req.query;
        let filter = {};
        
        if (status) {
            filter.status = status;
        }

        let projects;
        if (req.user.role === 'admin') {
            // Admin can see all projects
            projects = await Project.find(filter)
                .populate('createdBy', 'name email')
                .populate('teamMembers', 'name email profileImageUrl')
                .sort({ createdAt: -1 });
        } else {
            // Members can only see projects they're part of
            projects = await Project.find({
                ...filter,
                teamMembers: req.user._id
            })
                .populate('createdBy', 'name email')
                .populate('teamMembers', 'name email profileImageUrl')
                .sort({ createdAt: -1 });
        }

        // Get task count for each project
        const projectsWithStats = await Promise.all(
            projects.map(async (project) => {
                const totalTasks = await Task.countDocuments({ project: project._id });
                const completedTasks = await Task.countDocuments({ 
                    project: project._id, 
                    status: 'Completed' 
                });
                const pendingTasks = await Task.countDocuments({ 
                    project: project._id, 
                    status: 'Pending' 
                });
                const inProgressTasks = await Task.countDocuments({ 
                    project: project._id, 
                    status: 'In Progress' 
                });

                return {
                    ...project._doc,
                    taskStats: {
                        total: totalTasks,
                        completed: completedTasks,
                        pending: pendingTasks,
                        inProgress: inProgressTasks
                    }
                };
            })
        );

        res.status(200).json({
            success: true,
            count: projectsWithStats.length,
            data: projectsWithStats
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get single project by ID
// @route   GET /api/projects/:id
// @access  Private
const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
            .populate('createdBy', 'name email')
            .populate('teamMembers', 'name email profileImageUrl');

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Check if user has access to this project
        if (req.user.role !== 'admin' && !project.teamMembers.some(member => member._id.toString() === req.user._id.toString())) {
            return res.status(403).json({ message: 'Not authorized to access this project' });
        }

        // Get project tasks
        const tasks = await Task.find({ project: project._id })
            .populate('assignedTo', 'name email profileImageUrl')
            .sort({ createdAt: -1 });

        // Calculate task statistics
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.status === 'Completed').length;
        const pendingTasks = tasks.filter(task => task.status === 'Pending').length;
        const inProgressTasks = tasks.filter(task => task.status === 'In-Progress').length;

        res.status(200).json({
            success: true,
            data: {
                ...project._doc,
                tasks,
                taskStats: {
                    total: totalTasks,
                    completed: completedTasks,
                    pending: pendingTasks,
                    inProgress: inProgressTasks
                }
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private/Admin
const createProject = async (req, res) => {
    try {
        const {
            name,
            description,
            startDate,
            endDate,
            teamMembers,
            priority,
            budget,
            status
        } = req.body;

        // Validate required fields
        if (!name || !description || !startDate || !endDate) {
            return res.status(400).json({ 
                message: 'Please provide name, description, start date, and end date' 
            });
        }

        // Validate dates
        if (new Date(startDate) > new Date(endDate)) {
            return res.status(400).json({ 
                message: 'End date must be after start date' 
            });
        }

        const project = await Project.create({
            name,
            description,
            startDate,
            endDate,
            teamMembers: teamMembers || [],
            priority: priority || 'Medium',
            budget: budget || 0,
            status: status || 'Planning',
            createdBy: req.user._id
        });

        const populatedProject = await Project.findById(project._id)
            .populate('createdBy', 'name email')
            .populate('teamMembers', 'name email profileImageUrl');

        res.status(201).json({
            success: true,
            message: 'Project created successfully',
            data: populatedProject
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private/Admin
const updateProject = async (req, res) => {
    try {
        let project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const {
            name,
            description,
            status,
            startDate,
            endDate,
            teamMembers,
            priority,
            budget,
            progress
        } = req.body;

        // Update fields if provided
        if (name) project.name = name;
        if (description) project.description = description;
        if (status) project.status = status;
        if (startDate) project.startDate = startDate;
        if (endDate) project.endDate = endDate;
        if (teamMembers) project.teamMembers = teamMembers;
        if (priority) project.priority = priority;
        if (budget !== undefined) project.budget = budget;
        if (progress !== undefined) project.progress = progress;

        // Validate dates if both are present
        if (project.startDate && project.endDate && new Date(project.startDate) > new Date(project.endDate)) {
            return res.status(400).json({ 
                message: 'End date must be after start date' 
            });
        }

        const updatedProject = await project.save();
        
        const populatedProject = await Project.findById(updatedProject._id)
            .populate('createdBy', 'name email')
            .populate('teamMembers', 'name email profileImageUrl');

        res.status(200).json({
            success: true,
            message: 'Project updated successfully',
            data: populatedProject
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Check if project has tasks
        const taskCount = await Task.countDocuments({ project: project._id });
        
        if (taskCount > 0) {
            return res.status(400).json({ 
                message: `Cannot delete project. It has ${taskCount} task(s). Please delete or reassign tasks first.` 
            });
        }

        await project.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Project deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get project tasks
// @route   GET /api/projects/:id/tasks
// @access  Private
const getProjectTasks = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Check if user has access to this project
        if (req.user.role !== 'admin' && !project.teamMembers.includes(req.user._id)) {
            return res.status(403).json({ message: 'Not authorized to access this project' });
        }

        const { status } = req.query;
        let filter = { project: req.params.id };

        if (status) {
            filter.status = status;
        }

        const tasks = await Task.find(filter)
            .populate('assignedTo', 'name email profileImageUrl')
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get project statistics
// @route   GET /api/projects/:id/stats
// @access  Private
const getProjectStats = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Check if user has access to this project
        if (req.user.role !== 'admin' && !project.teamMembers.includes(req.user._id)) {
            return res.status(403).json({ message: 'Not authorized to access this project' });
        }

        const totalTasks = await Task.countDocuments({ project: req.params.id });
        const completedTasks = await Task.countDocuments({ project: req.params.id, status: 'Completed' });
        const pendingTasks = await Task.countDocuments({ project: req.params.id, status: 'Pending' });
        const inProgressTasks = await Task.countDocuments({ project: req.params.id, status: 'In-Progress' });

        // Calculate project completion percentage based on tasks
        const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        res.status(200).json({
            success: true,
            data: {
                totalTasks,
                completedTasks,
                pendingTasks,
                inProgressTasks,
                completionPercentage
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    getProjectTasks,
    getProjectStats
};
