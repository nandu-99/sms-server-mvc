
const leaveService = require('../services/leaveService');
const { formatISO, isValid } = require('date-fns');

const createLeaveRequest = async (req, res) => {
  const { leave_type, start_date, end_date, reason, file } = req.body;
  const { id, role } = req.user; 

  if (!isValid(new Date(start_date)) || !isValid(new Date(end_date))) {
    return res.status(400).json({ error: 'Invalid date format' });
  }
  
  if (new Date(end_date) < new Date(start_date)) {
    return res.status(400).json({ error: 'End date cannot be earlier than start date' });
  }

  const formattedStartDate = formatISO(new Date(start_date));
  const formattedEndDate = formatISO(new Date(end_date));

  try {
    const leaveRequest = await leaveService.createLeaveRequest(
      id,
      leave_type,
      formattedStartDate,
      formattedEndDate,
      reason
    );
    res.status(201).json({ message: 'Leave request created successfully', leaveRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getLeaveRequests = async (req, res) => {
  const { id } = req.user;
  try {
    const leaveRequests = await leaveService.getLeaveRequestsByUser(id);
    res.json(leaveRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteLeaveRequest = async (req, res) => {
  const { leaveRequestId } = req.params;
  try {
    await leaveService.deleteLeaveRequest(leaveRequestId);
    res.json({ message: 'Leave request deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {deleteLeaveRequest, getLeaveRequests, createLeaveRequest}
