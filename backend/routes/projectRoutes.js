const express = require('express');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    getProjectTasks,
    getProjectStats
} = require('../controllers/projectController');

const router = express.Router();

// Project CRUD routes
router.get('/', protect, getProjects); // Get all projects
router.get('/:id', protect, getProjectById); // Get project by ID
router.post('/', protect, adminOnly, createProject); // Create new project (admin only)
router.put('/:id', protect, adminOnly, updateProject); // Update project (admin only)
router.delete('/:id', protect, adminOnly, deleteProject); // Delete project (admin only)

// Project-specific routes
router.get('/:id/tasks', protect, getProjectTasks); // Get all tasks for a project
router.get('/:id/stats', protect, getProjectStats); // Get project statistics

module.exports = router;
