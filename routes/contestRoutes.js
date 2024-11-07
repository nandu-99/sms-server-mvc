const express = require('express');
const contestController = require('../controllers/contestController');
const {createContest, getContest, getAllContests, updateContest, deleteContest} = require("../controllers/contestController")
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create',verifyToken,  createContest);
router.get('/:contestId',verifyToken,  getContest);
router.get('/',verifyToken, getAllContests);
router.put('/:contestId',verifyToken ,updateContest);
router.delete('/:contestId',verifyToken, deleteContest);

module.exports = router;
