const express = require('express');
const router = express.Router();
const { createLeaveRequest, getLeaveRequests, deleteLeaveRequest } = require('../controllers/leaveController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, createLeaveRequest);
router.get('/', verifyToken, getLeaveRequests);
router.delete('/:leaveRequestId', verifyToken, deleteLeaveRequest);

module.exports = router;
