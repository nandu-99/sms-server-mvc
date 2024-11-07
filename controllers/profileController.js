const profileService = require('../services/profileService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { prismaClient } = require('../config/db');
require('dotenv').config();

const getProfile = async (req, res) => {
  const { id, role } = req.user;
  try {
    const profile = await profileService.getUserProfile(id, role);
    if (!profile) return res.status(404).json({ message: 'User not found' });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProfile = async (req, res) => {
  const { id, role } = req.user;
  const { 
    name, email, password, enrollmentId, dob, contactNumber, address,
    parentName, parentContact, school, profile_image 
  } = req.body;

  try {
    const updatedData = {};
    if (name) updatedData.name = name;
    if (email) updatedData.email = email;
    if (password) updatedData.password = await bcrypt.hash(password, 10); 
    if (enrollmentId) updatedData.enrollmentId = enrollmentId;
    if (dob) updatedData.dob = dob;
    if (contactNumber) updatedData.contactNumber = contactNumber;
    if (address) updatedData.address = address;
    if (parentName) updatedData.parentName = parentName;
    if (parentContact) updatedData.parentContact = parentContact;
    if (school) updatedData.school = school;
    if (profile_image) updatedData.profile_image = profile_image;

    const result = await profileService.updateUserProfile(id, role, updatedData);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {getProfile, updateProfile}
