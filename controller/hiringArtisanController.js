const HiringRequest = require('../models/hiringArtisanModel');

const createHiringRequest = async (req, res) => {
  try {
    const {
      fullName,
      email,
      jobDescription,
      startDate,
      endDate,
      startTime,
      notes
    } = req.body;

    const newRequest = new HiringRequest({
      fullName,
      email,
      jobDescription,
      startDate,
      endDate,
      startTime,
      notes
    });

    const result = await newRequest.save();
    res.status(201).json({
      success: true,
      message: 'Hiring request submitted successfully',
      result,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Get all hiring requests
const getHiringRequests = async (req, res) => {
  try {
    const requests = await HiringRequest.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  createHiringRequest,
  getHiringRequests
};