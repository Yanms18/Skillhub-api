const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // <--- Add this line
const connectDB = require('./database/db');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authentication');
const hiringArtisanRoutes = require('./routes/hiringArtisanRoutes');
const paystackRoutes = require('./routes/paystackRoutes');
const contactRoutes = require('./routes/contactRoutes');
const conversationRoutes = require('./routes/conversation');
const messageRoutes = require('./routes/messageRoutes');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/hiring', hiringArtisanRoutes);
app.use('/api/paystack', paystackRoutes);
app.use('/api/contactUs', contactRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/messages', messageRoutes);


// Example route to test the server
app.get('/', (req, res) => {
  res.json({ message: 'Hello from the server' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//

module.exports = app;