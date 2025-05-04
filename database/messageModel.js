const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
      conversationId: {
        type: String,
        required: true,
      },
      sender: {
        type: String,
        required: true,
      },
      text: {
        type: String,
      },
    },
{timestamps: true} // Automatically add createdAt and updatedAt fields
);

module.exports = mongoose.model("Message", messageSchema);

// const mongoose = require("mongoose");

// const messageSchema = new mongoose.Schema({
//   content: String,
//   from: String,
//   to: String,
//   timestamp: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Message", messageSchema);