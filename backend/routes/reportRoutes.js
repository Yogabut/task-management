const express = require('express');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const { exportTasksReport, exportUserReport } = require('../controllers/reportController');

const router = express.Router();

router.get("/export/tasks", protect, adminOnly, exportTasksReport); // Export all tasks as excel/pdf
router.get("/export/user", protect, exportUserReport); // Export user specific tasks as excel/pdf

module.exports = router;