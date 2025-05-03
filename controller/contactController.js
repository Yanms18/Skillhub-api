const ContactMessage = require('../models/ContactMessage');

const createContactMessage = async (req, res) => {
  try {
    const { name, email, phoneNumber, message } = req.body;
    const newMessage = new ContactMessage({ name, email, phoneNumber, message });
    const result = await newMessage.save();
    res.status(201).json({
      success: true,
      message: 'Contact message submitted successfully',
      result,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { 
  createContactMessage,
  getContactMessages
};