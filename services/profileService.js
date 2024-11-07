const { prismaClient } = require('../config/db');


const getUserProfile = async (userId, role) => {
  return await prismaClient[role].findUnique({
    where: { id: userId },
  });
};


const updateUserProfile = async (userId, role, updatedData) => {
  try {
    let user;
    switch (role) {
      case 'student':
        user = await prismaClient.student.findUnique({ where: { id: userId } });
        break;
      case 'admin':
        user = await prismaClient.admin.findUnique({ where: { id: userId } });
        break;
      case 'teacher':
        user = await prismaClient.teacher.findUnique({ where: { id: userId } });
        break;
      default:
        throw new Error('Invalid role');
    }

    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser = await prismaClient[role].update({
      where: { id: userId },
      data: updatedData,
    });

    const { password: pwd, createdAt, ...userData } = updatedUser;
    return { message: 'Profile updated successfully', data: userData };
    
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};
