const { prismaClient } = require('../config/db');

const createContest = async (name, date, endDate, weightage, course, school) => {
  return await prismaClient.contest.create({
    data: {
      name,
      date,
      endDate,
      weightage,
      course,
      school,
    },
  });
};

const getContestById = async (contestId) => {
  return await prismaClient.contest.findUnique({
    where: { id: contestId },
  });
};

const getAllContests = async () => {
  return await prismaClient.contest.findMany();
};

const updateContest = async (contestId, updateData) => {
  return await prismaClient.contest.update({
    where: { id: contestId },
    data: updateData,
  });
};

const deleteContest = async (contestId) => {
  return await prismaClient.contest.delete({
    where: { id: contestId },
  });
};

module.exports = {
  createContest,
  getContestById,
  getAllContests,
  updateContest,
  deleteContest,
};
