const contestService = require('../services/contestService');

const createContest = async (req, res) => {
  const { name, date, endDate, weightage, course, school } = req.body;
  try {
    const contest = await contestService.createContest(name, date, endDate, weightage, course, school);
    res.status(201).json({ message: 'Contest created successfully', contest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getContest = async (req, res) => {
  const { contestId } = req.params;
  try {
    const contest = await contestService.getContestById(parseInt(contestId));
    if (!contest) return res.status(404).json({ message: 'Contest not found' });
    res.json(contest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllContests = async (req, res) => {
  try {
    const contests = await contestService.getAllContests();
    res.json(contests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateContest = async (req, res) => {
  const { contestId } = req.params;
  const updateData = req.body;
  try {
    const updatedContest = await contestService.updateContest(parseInt(contestId), updateData);
    if (!updatedContest) return res.status(404).json({ message: 'Contest not found' });
    res.json(updatedContest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteContest = async (req, res) => {
  const { contestId } = req.params;
  try {
    await contestService.deleteContest(parseInt(contestId));
    res.json({ message: 'Contest deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createContest, getContest, updateContest, deleteContest, getAllContests };
