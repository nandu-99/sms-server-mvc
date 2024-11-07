const { prismaClient } = require('../config/db');

const createLeaveRequest = async (userId, leaveType, startDate, endDate, reason) => {
  try {
    return await prismaClient.leaveRequest.create({
      data: {
        userId,
        leaveType,
        startDate,
        endDate,
        reason,
        status: "Pending"
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getLeaveRequestsByUser = async (userId) => {
  return await prismaClient.leaveRequest.findMany({
    where: { userId },
  });
};

const deleteLeaveRequest = async (leaveRequestId) => {
  return await prismaClient.leaveRequest.delete({
    where: { id: parseInt(leaveRequestId) },
  });
};

module.exports = {
  createLeaveRequest,
  getLeaveRequestsByUser,
  deleteLeaveRequest,
};
