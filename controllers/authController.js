const authService = require('../services/authService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const user = await authService.createUser(name, email, password, role);
    const token = authService.generateToken(user);
    res.cookie('authToken', token, { httpOnly: true });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await authService.findUserByEmail(email, role);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = authService.generateToken(user);
    res.json({ message: 'Logged in successfully', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logoutUser = (req, res) => {
  try {
    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error during logout:', error);
    return res.status(500).json({ message: 'Logout failed', error: error.message });
  }
};


module.exports = {createUser, loginUser, logoutUser}
