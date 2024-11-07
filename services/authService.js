const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { prismaClient } = require('../config/db');
require('dotenv').config();

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

const findUserByEmail = async (email, role) => {
  return await prismaClient[role].findUnique({ where: { email } });
};

const createUser = async (name, email, password, role) => {
    const hashedPassword = await hashPassword(password);
    let existingUser;
    let newUser;
    try {
      switch (role) {
        case 'student':
          existingUser = await prismaClient.student?.findUnique({
            where: { email: email },
          });
          if (existingUser) {
            throw new Error('Student already exists');
          }
          newUser = await prismaClient.student.create({
            data: { name, email, password: hashedPassword, role },
          });
          break;

        case 'admin':
          existingUser = await prismaClient.admin?.findUnique({
            where: { email: email },
          });
          if (existingUser) {
            throw new Error('Admin already exists');
          }
          newUser = await prismaClient.admin.create({
            data: { name, email, password: hashedPassword, role },
          });
          break;
  
        case 'teacher':
          existingUser = await prismaClient.teacher?.findUnique({
            where: { email: email },
          });
          if (existingUser) {
            throw new Error('Teacher already exists');
          }
          newUser = await prismaClient.teacher.create({
            data: { name, email, password: hashedPassword, role },
          });
          break;
  
        default:
          throw new Error('Invalid role');
      }
  
      return newUser; 
  
    } catch (error) {
      console.error(error);
      throw new Error(error.message); 
    }
};
  

module.exports = {
  hashPassword,
  generateToken,
  findUserByEmail,
  createUser,
};
