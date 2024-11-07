const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, getProfile);
router.put('/update', verifyToken, updateProfile);

module.exports = router;
